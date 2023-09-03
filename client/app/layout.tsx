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

    useEffect(() => {
        setisMoblie(window.innerWidth <= 640);
    }, [])

    return (
        <html lang='en'>
            <body className='flex flex-col w-screen min-h-screen overflow-x-hidden'>
                <div className='fixed bg-slate-800 shadow-lg h-14 w-full flex justify-center items-center transition-all z-50'>
                    { isMobile != null ? ( isMobile ?
                        <></>:
                        <>
                            <div className='absolute text-center font-Bungee text-4xl py-2 text-slate-500 w-min left-4'><Link href="/">{process.env.NEXT_PUBLIC_EVENT_NAME}</Link></div>
                            <div className='absolute flex right-4 gap-3'>
                                <Navbar></Navbar>
                            </div>
                        </> ) : <Loading></Loading> }
                </div>
                {isMobile != null ? ( isMobile ? <div className='absolute flex flex-col justify-center items-center top-0 end-0 bg-slate-800 h-screen w-screen'>
                    <p className='mt-20 text-slate-400'>THIS IS A DESKTOP APPLICATION</p>
                    <div className='bg-deskOnly h-full w-full bg-contain bg-no-repeat bg-center'></div>
                </div> : <Context.Provider value={isMobile}> { children } </Context.Provider>) : <></>}
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
                <div className='z-40 fixed bottom-5 end-5 text-slate-500'>made by titans@titancrew 👀</div>
            </body>
        </html>
    )
}

export function DeviceContxt() {
    return useContext(Context);
}