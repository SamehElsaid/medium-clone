import Image from 'next/image';
import React, { memo, useEffect, useState } from 'react';
import { BsBookmarkPlus } from "react-icons/bs"
import Link from 'next/link';
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../firebase/firebase';

const style = {
    profileContainer: "flex | gap-2 | items-center | cursor-pointer",
    imgContainer: "w-6 | h-6 | rounded-full | relative",
    textH3: "cursor-pointer | font-bold | text-2xl | jd |  mt-2 || capitalize"
}
const PostCard = memo(({ data }) => {
    const [authorData, setAuthorData] = useState(null)
    useEffect(() => {
        const getAuthorData = async () => {
            setAuthorData((await getDoc(doc(db, "users", data.author))).data())
        }
        getAuthorData()
    }, [])
    return (
        <Link href={`/post/${data.id}`}>
            <div className='flex items-center gap-y-5 py-5 flex-wrap'>
                <div className="pr-4 w-[100%] md:w-[60%]">
                    <div className={style.profileContainer}>
                        {authorData &&
                            <>
                                <div className={style.imgContainer}>
                                    <Image height={1000} width={1000}  loading="lazy" sizes='100%' className='object-cover | rounded-full ' src={authorData.imgUrl} alt="ss" />
                                </div>
                                <h2 className='text-sm || capitalize || font-semibold'>{authorData.name}</h2>
                            </>
                        }
                    </div>
                    <h3 className={style.textH3}>{data.title}</h3>
                    <p className='text-[#757575] | jd | w-[85%] | leading-5 '>
                        {data.brief}
                    </p>
                    <div className="flex | justify-between | items-end ">
                        <p className='text-[13px] | text-[#757575] |  mt-3'>
                        
                            {new Date(data.timestamp).toLocaleString("en-US", {
                                day: "numeric",
                                month: "short"
                            })}  <span className='bg-[#f2f2f2] | px-2 | py-1 || capitalize | rounded-full'>{data.category}</span></p>
                        <p><BsBookmarkPlus className='text-2xl cursor-pointer' /></p>
                    </div>
                </div>
                <div className=" object-cover w-[100%] md:w-[35%] relative h-[150px]">

                    <Image height={1000} width={1000} loading="lazy" sizes='100%'  className="object-cover object-center w-full h-full" src={data.bannerImg} alt="s" />
                </div>
            </div>
        </Link>
    );
});

export default PostCard;