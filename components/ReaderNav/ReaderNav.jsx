import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';
import smallLogo from "../../static/smallLogo.png"
import personal from "../../static/148455-1546611604.webp"
import { AiOutlineHome } from "react-icons/ai"
import { AiOutlineBell } from "react-icons/ai"
import { BsBookmarks } from "react-icons/bs"
import { MdOutlineArticle } from "react-icons/md"
import { BsPencilSquare } from "react-icons/bs"
const style = {
    slug: " min-h-screen | flex | flex-col ",
    links: "text-2xl | h-full | text-[#787878] | flex-grow | grid | content-center | justify-center | py-10 | gap-[3rem]",
    personal: "w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden || relative || m-auto"
}
const ReaderNav = memo(({ author }) => {
    return (
        <div className={`${style.slug} py-5`}>
            <Link href={"/"} className="md:w-14 || w-10  | block || m-auto">
                <Image src={smallLogo} className="object-contain" alt='s' />
            </Link>
            <div className={style.links}>
                <AiOutlineHome className='cursor-pointer' />
                <AiOutlineBell className='cursor-pointer' />
                <BsBookmarks className='cursor-pointer' />
                <MdOutlineArticle className='cursor-pointer' />
                <BsPencilSquare className='cursor-pointer' />
            </div>
            <div className={style.personal}>
                {author &&
                    <Image src={author.imgUrl} width={1000} height={1000} loading="lazy" sizes='100%' className="object-cover w-full h-full" alt='s' />
                }
            </div>
        </div>
    );
});

export default ReaderNav;