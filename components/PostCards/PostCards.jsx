import React, { memo } from 'react';
import PostCard from '../PostCard/PostCard';
import mainStyle from "../../styles/Home.module.css"
import {useSelector} from "react-redux"
const PostCards = memo(() => {
    const postData = useSelector(post=>post.data.article)
    return (
        <div className={mainStyle.containerEdit}>
            <div className="flex gap-10 ">
                <div className="w-[100%] lg:w-[65%]">
                    `{postData && postData.map(post=>(
                        <PostCard key={post.id} data={post}/>
                    ))}`
                </div>
                <div className="w-[0%] lg:w-[35%]">
                </div>
            </div>
        </div>
    );
});

export default PostCards;