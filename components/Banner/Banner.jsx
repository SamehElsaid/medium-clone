import Image from 'next/image';
import React, { memo } from 'react';
import logo from "../../static/banner.png"
const style = {
    mainBanner :"pl-16 | bg-[#FCC017] border-y-2 | py-5 border-black bor",
    banner: "flex | justify-between | items-center",
    logo: "h-[400px] | flex | justify-end ",
    img:"w-full | h-full | object-contain",
    btn :"px-12  mt-10 bg-[#191919] | rounded-full | text-white | py-2 | hover:bg-black | duration-700"
}
const Banner = memo(() => {
    return (
        <div className={style.mainBanner}>
            <div className={style.banner}>
                <div className="">
                    <h1 className='text-9xl | w-fit  | mb-10'>Stay curious.</h1>
                    <p className='text-2xl | w-[65%] | text-[#292929]'>Discover stories, thinking, and expertise from writers on any topic.</p>
                    <button className={style.btn}>Start reading</button>
                </div>
                <div className={style.logo}>
                    <Image className={style.img} src={logo} width={"fill"} height={"fill"} alt="banner"/>
                </div>
            </div>
        </div>
    );
});

export default Banner;