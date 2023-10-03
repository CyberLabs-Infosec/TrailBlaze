'use client'

import React, { useEffect, useState } from 'react';
import '../../public/static/css/globals.css'
import Loading from '../../components/Loading';

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    const [cache, setCache] = useState(false);

    useEffect(() => {
        async function preloadImages(array) {
            for (var i = 0; i < array.length; i++) {
                await new Promise((resolve, reject) => {
                    var img = new Image();
                    img.src = array[i];
                    img.onload = () => { resolve("loaded") };
                })
            }
            setCache(true);
        }
        preloadImages(["/static/assets/slide_1.jpg", "/static/assets/slide_2.jpg", "/static/assets/slide_3.jpg"]);
    }, [])
    return (
        cache ? children : <Loading text={JSON.stringify(['Please wait!'])}></Loading>
    )
}