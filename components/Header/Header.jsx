import React, { memo } from 'react';
import Image from 'next/image';
import mainStyle from "../../styles/Home.module.css"
import logo from "../../public/img/logo.png"
import { GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, signInWithGoogle, singout } from '../../firebase/firebase';
import { useSelector } from "react-redux"
import { useRouter } from 'next/router';
import Modal from "react-modal"
import Link from 'next/link';
import PostModal from '../PostModal/PostModal';
Modal.setAppElement("#__next")
const customStyle = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%,-50%)",
        background: "#fff",
        padding: 0,
        border: "none"
    },
    overlay: {
        backgroundColor: "rgba(10,11,13,0.75)"
    }
}
const style = {
    header: "bg-[#FCC017] p-5 px-16 flex justify-between items-center",
    logo: "object-contain w-[200px] h-[45px]",
    logoContainer: "flex items-start",
    links: "flex gap-5 items-center cursor-pointer text-sm",
    accBtn: "px-4 py-2 bg-black rounded-full text-white cursor-pointer text-sm"
}
const Header = memo(() => {
    const provider = new GoogleAuthProvider();
    const router = useRouter()
    let login = useSelector(ele => ele.auth.isLoggedin)
    const singGoogle = () => {
        signInWithGoogle(provider)
            .then((result) => {
                getDoc(doc(db, "users", result.user.email)).then(myUser => {
                    if (myUser.data() === undefined) {
                        setDoc(doc(db, "users", result.user.email), {
                            email: result.user.email,
                            followers: 0,
                            imgUrl: result.user.photoURL,
                            name: result.user.displayName
                        })
                    } else {
                        updateDoc(doc(db, "users", result.user.email), {
                            email: result.user.email,
                            followers: myUser.data().followers,
                            imgUrl: result.user.photoURL,
                            name: result.user.displayName
                        })
                    }
                }).catch(ee => console.log(ee))
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={`${mainStyle.containerEdit} ${style.header}`} >
            <div className={style.logoContainer}>
                <Image className={style.logo} height={"fill"} width={"fill"} src={logo} alt="logo" />
            </div>
            <ul className={style.links}>
                {login ?
                    <>
                        <Link href={"/?addnew=1"} className={style.accBtn} >Write</Link>
                        <li onClick={singout} className={style.accBtn}>Log out</li>
                    </> :
                    <>
                        <li>Our story</li>
                        <li>Membership</li>
                        <li>Write</li>
                        <li onClick={singGoogle}>Sign In</li>
                        <li className={style.accBtn}>Get started</li>
                    </>
                }
                {login &&
                    <Modal isOpen={Boolean(router.query.addnew)} style={customStyle} onRequestClose={() => { router.push("/") }}>
                    <PostModal/>
                    </Modal>
                }
            </ul>
        </div>
    );
});

export default Header;