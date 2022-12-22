import { doc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { memo, useRef, useState } from 'react';
import { db, storage } from '../../firebase/firebase';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const style = {
    input: "border || py-2 || px-4 border-black"
}
const postModal = memo(() => {
    const [img, setImg] = useState(false);
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const textControl = useRef()
    const router = useRouter()
    const email = useSelector(ele => ele.auth.email)
    const handleUpdate = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].name.split(".").at(-1) === "jpeg"
                || e.target.files[0].name.split(".").at(-1) === "png"
                || e.target.files[0].name.split(".").at(-1) === "jpg"
            ) {
                setImg(e.target.files[0]);
                textControl.current.style.display = "block"
                if (textControl.current.classList.contains("notAllow")) {
                    textControl.current.classList.remove("notAllow")
                    textControl.current.classList.add("accepted")
                } else {
                    textControl.current.classList.add("accepted")
                }
                textControl.current.innerText = "Selected Image"
            } else {
                setImg(false);
                textControl.current.style.display = "block"
                if (textControl.current.classList.contains("accepted")) {
                    textControl.current.classList.remove("accepted")
                    textControl.current.classList.add("notAllow")
                } else {
                    textControl.current.classList.add("notAllow")
                }
                textControl.current.innerText = "This File is not Allow"
            }
        }
    };
    const handleUp = (e) => {
        e.preventDefault()
        e.target.btn.setAttribute('disabled', '')
        if (img) {
            const storageRef = ref(storage, `/img/${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress === 100) {
                        setImg(false);
                    }
                },
                (err) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            addDoc(collection(db, "article"), {
                                author: email,
                                bannerImg: downloadURL,
                                body,
                                brief,
                                category,
                                postLength: "2",
                                title,
                                timestamp: serverTimestamp(),
                            })
                        })
                        .then(() => {
                            setBody("")
                            setBrief("")
                            setCategory("")
                            setImg(false)
                            setTitle("")
                            e.target.file.value = ""
                            e.target.btn.removeAttribute('disabled');
                            textControl.current.style.display = "none"

                            setTimeout(()=>{
                            window.location.reload();
                            }, 500)
                        })
                }
            );
        } else {
        }
    };
    return (
        <div className=''>
            <h2 className='text-3xl || font-bold || text-center || my-5'>Create a New Post</h2>
            <form action="" className='grid || gap-5 || px-10 || mt-5' onSubmit={handleUp}>
                <input type="text" className={style.input} placeholder='Title' value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} required />
                <input type="text" className={style.input} placeholder='Brief'
                    value={brief} onChange={(e) => {
                        setBrief(e.target.value)
                    }} required
                />
                <div className="flex items-center gap-5 flex-wrap">
                    <input name="file" required type="file" onChange={handleUpdate} accept="image/png, image/jpg, image/jpeg" />
                    <span style={{ display: "none" }} className="accepted" ref={textControl}></span>
                </div>
                <input required type="text" className={style.input} placeholder='Category'
                    value={category} onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                />
                <textarea
                    required
                    value={body} onChange={(e) => {
                        setBody(e.target.value)
                    }}
                    name="" id="" cols="30" rows="10" className={style.input} placeholder='Article Text'></textarea>
                <div className="pb-4">
                    <button name="btn" type="submit" className="bg-black btn-info text-white px-5 py-2 rounded-full hover:bg-[#222] duration-500">Add Post</button>
                </div>
            </form>
        </div>
    );
});

export default postModal;