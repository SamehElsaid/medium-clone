import Image from 'next/image';
import React, { memo, useEffect } from 'react';
import { AiFillPlayCircle, AiOutlineLink, AiOutlineTwitter } from "react-icons/ai"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import { BiBookmarks } from "react-icons/bi"
import { FiMoreHorizontal } from "react-icons/fi"
const style = {
    articleMain: "flex  || h-screen editScroll || border-r || border-l || px-5 || overflow-y-scroll",
    linksSoical: "text-[#787878] hover:text-black cursor-pointer duration-300"
}
const ArticleMain = memo(({author,data}) => {
    return (
        <div className={style.articleMain}>
            <div className="pt-16  || w-full ">
                <div className=" w-full">
                    <div className="flex || items-center || justify-between || w-full || flex-wrap">
                        <div className="flex gap-5 flex-wrap mb-5 lg:mb-0">
                            <div className="w-14 || h-14 || relative">
                                {author&&
                                <Image  width={1000} height={1000} sizes='100%' loading="lazy" className="w-14 || h-14 || object-cover || rounded-full" src={author.imgUrl} alt="s" />
                                }
                            </div>
                            <div className="cursor-pointer">
                                {author &&
                                    <>
                                        <h2 className='capitalize || font-semibold'>{author.name}</h2>
                                        <p className='flex || items-center || flex-wrap || text-[#787878] || gap-1'>
                                            {new Date(data.timestamp).toLocaleString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                            })} · {data.postLength} min read · <span className='flex || text-green-600 || cursor-pointer || items-center || gap-1'> <AiFillPlayCircle /> Listen</span></p>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="flex || gap-3 || items-center || text-xl || flex-wrap ">
                            <AiOutlineTwitter className={style.linksSoical} />
                            <FaFacebookF className={style.linksSoical} />
                            <FaLinkedinIn className={style.linksSoical} />
                            <AiOutlineLink className={style.linksSoical} />
                            <BiBookmarks className={`ml-0 md:ml-6 ${style.linksSoical}`} />
                            <FiMoreHorizontal className={style.linksSoical} />
                        </div>
                    </div>
                </div>
                <div className="h-[18rem] || my-5 || relative">
                    {data&&
                    <Image width={1000} height={1000} sizes='100%' loading="lazy" className='h-full || object-contain' src={data.bannerImg} alt="s" />
                    }
                </div>
                <div className="w-[70%]">
                    {data && <>
                        <h2 className='font-semibold || text-2xl || mb-5'>{data.title}</h2>
                        {author &&
                            <p>{author.name} ,  {" "}
                                {new Date(data.timestamp).toLocaleString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}</p>
                        }
                        <p className='mb-5'>{data.brief}</p>
                        <p>{data.body}</p>
                    </>}
                </div>
            </div>
        </div>
    );
});

export default ArticleMain;