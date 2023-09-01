'use client'

import React, { useEffect } from 'react';

export default function Page() {
    const vals = ["REACH EARTH.", "SOLVE CHALLS.", "HACK GALAXY."];

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
        <div className="flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900">
            <div className='flex flex-col justify-center items-center gap-10'>
                <p className='font-PressStart text-slate-200 text-8xl text-left'>LET'S <span id='varVal' className='text-violet-400'>{vals[0]}</span></p>
                <p className='font-ADLaM text-slate-300 text-6xl'>Time Left: 02:10:59</p>
            </div>
        </div>
    )
}