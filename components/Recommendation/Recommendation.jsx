import Image from 'next/image';
import React, { memo, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import RecommededPost from '../RecommededPost/RecommededPost';
const style = {
    unlimited: "w-full || bg-black  || text-white || rounded-full || py-2 || mb-3",
    searchBar: "flex || items-center || px-3 || py-2 || border || gap-2 || rounded-full || mb-3",
    imgContainer: "w-20 || h-20 || mb-4 || mt-6 || relative",
    personalContainer: "flex || gap-3 || mt-5",
    personalBtn: "bg-green-700 || text-white || rounded-full || w-fit || px-3 || py-2"
}
const Recommendation = memo(({ author, data }) => {
    const allPost = useSelector((ele) => ele.data.article)
    const [recomeendData, setRecomeendData] = useState(false)
    useEffect(() => {
    
        if (data) {
            setRecomeendData(allPost.filter(ele => ele.category.toLowerCase().trim() === data.category.toLowerCase().trim()).slice(0, 3))
        }
    }, [data])
    return (
        <div className='h-screen || pt-16 || pb-5|| editScroll || items-center  || overflow-y-scroll || pr-5'>
            <div>
                <button className={style.unlimited}>Get unlimited access</button>
                <div className={style.searchBar}>
                    <AiOutlineSearch />
                    <input type="text" placeholder='Search' className='outline-none' />
                </div>
                {author &&
                    <div>
                        <div className={style.imgContainer}>
                            <Image src={author.imgUrl} width={100} height={100} loading="lazy" sizes='100%' className="w-full || h-full || object-cover || rounded-full" alt='s' />
                        </div>
                        <h2 className='font-semibold capitalize'>{author.name}</h2>
                        <p className='text-[#767676]'>{author.followers} followers</p>
                        <div className={style.personalContainer}>
                            <button className={style.personalBtn}>Follow</button>
                            <button className={style.personalBtn}><MdOutlineEmail /></button>
                        </div>
                        <div className="mt-6 ">
                            <h2 className='capitalize'>More from Medium</h2>
                            {recomeendData && recomeendData.map(post =>
                                <RecommededPost post={post} key={post.id} author={author} />
                            )}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
});

export default Recommendation;