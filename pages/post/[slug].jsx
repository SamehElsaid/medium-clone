import React, { memo , useEffect, useState} from 'react';
import ArticleMain from '../../components/ArticleMain/ArticleMain';
import ReaderNav from '../../components/ReaderNav/ReaderNav';
import Recommendation from '../../components/Recommendation/Recommendation';
import { useSelector } from "react-redux"
import { useRouter } from 'next/router';
const slug = memo(() => {
    const article = useSelector(article => article.data.article)
    const users = useSelector(article => article.data.user)
    const [data, setData] = useState(false)
    const [author, setAuthor] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (article) {
            setData(article.find(post => post.id === router.query.slug));
            setAuthor(users.find(user => user.id === data.author))
        }
    }, [article, data,router.query.slug])
    return (
        <div className={`flex || container || mx-auto  `}>
            <div className="w-[20%] md:w-[10%]">
            <ReaderNav author={author}/>
            </div>
            <div className="w-[100%] ||  pr-5">
                <ArticleMain author={author} data={data}/>
            </div>
            <div className="w-[40%] hidden lg:block">
            <Recommendation author={author} data={data}/>
            </div>
        </div>
    );
});

export default slug;