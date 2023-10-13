'use client'

import Link from 'next/link';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { setNotification, getNotification } from '../utils/notification';
import Timer from '../components/Timer';

import nvcti from "../sponsor_logos/nvcti_logo.png";
import pingsafe from "../sponsor_logos/pingSafe_logo.png";
import EndTimer from '../components/endTimer';

export default function Page() {
    const vals = ["REACH EARTH", "SOLVE CHALLS", "HACK GALAXY"];

    useEffect(() => {
        var val = 1;
        const interval = setInterval(() => {
            try {
                document.getElementById("varVal").innerHTML = vals[val];
            } catch {
                clearInterval(interval);
            }
            val += 1;
            if (val == vals.length) val = 0;
            return () => clearInterval(interval);
        }, 2000)
    }, [])

    useEffect(() => {
        const {toShow, type, message} = getNotification();
        if (toShow === "true") {
            switch (type) {
                case "info":
                    toast.info(message);
                    break;
                case "success":
                    toast.success(message);
                    break;
                case "warn":
                    toast.warn(message);
                    break;
                case "error":
                    toast.error(message);
                    break;
                default:
                    toast(message);
                    break;
            }
            setNotification();
        }
    }, [])

    return(
        <div className="flex absolute items-center w-full min-h-full bg-slate-900 flex flex-col gap-18 overflow-y-scroll">
            <div className='relative flex flex-col justify-center items-center gap-10 -translate-y-1/2' style={{ top: "50vh" }}>
                <p className='font-PressStart text-slate-200 text-8xl text-center'>LET'S <span id='varVal' className='text-violet-400'>{vals[0]}</span></p>
                <p className='font-ADLaM text-slate-300 text-6xl flex gap-5'>{new Date() < new Date(process.env.NEXT_PUBLIC_EVENT_START) ? <><span>Event begins in</span> <Timer></Timer></> : <><span>Event ends in</span> <EndTimer></EndTimer></>}</p>
            </div>
            <div className='relative' style={{ top: "50vh" }}>
                <p className='text-slate-400 text-4xl font-bold'>- OUR SPONSORS -</p>
                <hr className='border-2 border-slate-500'></hr>
                <div className='flex p-10 justify-center items-center gap-5'>
                    <Link href="https://people.iitism.ac.in/~research/files/NVCTI_Brochure.pdf" target='_blank'>
                        <img height="120" width="120" src={nvcti.src}></img>
                        <div className='text-slate-400 text-center mt-4'>NVCTI</div>
                    </Link>
                    <Link href="https://www.pingsafe.com/in/" target='_blank'>
                        <img height="120" width="120" src={pingsafe.src}></img>
                        <div className='text-slate-400 text-center mt-4'>PingSafe</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}