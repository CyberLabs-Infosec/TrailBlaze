'use client'

import Link from 'next/link';
import React, { useEffect } from 'react';

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

    return(
        <div className="flex absolute justify-center items-center w-full min-h-full bg-slate-900">
            <div className='flex flex-col justify-center items-center gap-10'>
                <p className='font-PressStart text-slate-200 text-8xl text-center'>LET'S <span id='varVal' className='text-violet-400'>{vals[0]}</span></p>
                <p className='font-ADLaM text-slate-300 text-6xl'>Time Left: 02:10:59</p>
                <div className='absolute text-slate-400 bottom-20 flex flex-col justify-center items-center gap-3'>
                    <div className='bg-cusBorder h-8 w-80 bg-center bg-no-repeat bg-contain'></div>
                    <p className='text-slate-500 text-center text-xl font-bold hover:text-violet-200 transition-all'><Link href="/story">CLICK TO VIEW STORY</Link></p>
                    <div className='bg-cusBorder h-8 w-80 bg-center bg-no-repeat bg-contain rotate-180'></div>
                </div>
            </div>
        </div>
    )
}