'use client'

import React, { createContext, useEffect, useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navigation";
import '../public/static/css/globals.css'

import Loading from '../components/Loading';
import Link from 'next/link';

const Context = createContext(null);

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    const [isMobile, setisMoblie] = useState(null);
    const hamStyle = 'w-8 h-1 bg-slate-500 rounded-full bun right-0';

    useEffect(() => {
        setisMoblie(window.innerWidth <= 640);
    }, [])

    const onHamClick = () => {
        var butn = document.getElementById("hamburger");
        const buns = document.getElementsByClassName("bun");
        if (butn.classList.contains("left-0")) {
            butn.classList.remove("left-0");
            butn.classList.add("left-full");
            butn.classList.add("hidden");
            for (var i = 0; i < buns.length; i++) {
                buns[i].classList.remove("absolute");
            }
            document.getElementById("hamBtn").classList.remove("bg-rose-600");
        }
        else {
            butn.classList.add("left-0");
            butn.classList.remove("left-full");
            butn.classList.remove("hidden");
            for (var i = 0; i < buns.length; i++) {
                buns[i].classList.add("absolute");
            }
            document.getElementById("hamBtn").classList.add("bg-rose-600");
        }
    }

    return (
        <html lang='en'>
            <body className='flex flex-col w-screen min-h-screen'>
                <div className='sticky shadow-lg h-14 w-full flex justify-center items-center transition-all z-50'>
                    { isMobile != null ? ( isMobile ?
                        <div className='flex justify-center items-center'></div>:
                        <>
                            <div className='absolute text-center font-Bungee text-4xl py-2 text-slate-500 w-min left-4'><Link href="/">CyberTrail</Link></div>
                            <div className='flex absolute right-4 gap-3'>
                                <Navbar></Navbar>
                            </div>
                        </> ) : <Loading></Loading> }
                </div>
                <Context.Provider value={isMobile}> { children } </Context.Provider>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className='z-40 absolute bottom-5 end-5 text-slate-500'>made by titans@titancrew 👀</div>
            </body>
        </html>
    )
}

export function DeviceContxt() {
    return useContext(Context);
}