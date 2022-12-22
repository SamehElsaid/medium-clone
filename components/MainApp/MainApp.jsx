import React, { memo, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useDispatch } from "react-redux"
import { useEffect } from 'react';
import { SET_ARTICLE, SET_USERS } from '../../Redux/data/dataSilce';
import { onAuthStateChanged } from "firebase/auth";
import { REMOVE_ACTICE_USER, SET_ACTICE_USER } from '../../Redux/authSlice/authSlice';
const MainApp = memo(({ children }) => {
    const dispatch = useDispatch()
    const users = () => {
        let sub = onSnapshot(query(collection(db, "users")), (snapshot) => {
            let fetch = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            dispatch(SET_USERS(fetch))
        })
        return sub
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(SET_ACTICE_USER(user.email))
        } else {
            dispatch(REMOVE_ACTICE_USER())
        }
    });
    useEffect(() => {
        const article = () => {
            let sub = onSnapshot(query(collection(db, "article"), orderBy("timestamp", "desc")),  (snapshot) => {
                let fetch = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        timestamp: `${doc.data().timestamp.toDate()}`
                        , id: doc.id
                    }
                })
                dispatch(SET_ARTICLE(fetch))
            })
            return sub
        }
        users()
        article()
    }, [])
    return (
        <>
            {children}
        </>
    );
});

export default MainApp;