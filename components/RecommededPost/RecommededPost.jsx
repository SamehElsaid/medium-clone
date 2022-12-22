import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useEffect } from 'react';
const style = {
    imgContainer: "w-6 || h-6 ",
}
const RecommededPost = memo(({ post ,author}) => {
    return (
        <div className=''>
            {post &&
                <Link href={`/post/${post.id}`} className="flex || mt-7 || gap-5">
                    <div className="w-[60%]">
                        <div className="flex || gap-2 || items-center">
                            <div className={style.imgContainer}>
                                <Image className='w-full  || h-full || object-cover || rounded-full'  width={1000} height={1000} alt='s' src={author.imgUrl} />
                            </div>
                            <h2>{author.name}</h2>
                        </div>
                        <div className="jd || mt-3">
                            <p>{post.brief}</p>
                        </div>
                    </div>
                    <div className="w-[40%]">
                        <div className="w-full  || h-full ">
                            <Image className='w-full  || h-full || object-cover ' height={1000} width={1000} alt='s' src={post.bannerImg} />
                        </div>
                    </div>
                </Link>
            }
        </div>
    );
});

export default RecommededPost;