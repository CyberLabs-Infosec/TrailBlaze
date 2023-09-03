import React from "react"

export default function Loading() {
    return (
        <div className="absolute flex flex-col top-0 end-0 z-50 h-screen w-screen bg-slate-800 justify-center items-center">
            <p className="text-slate-400 text-5xl font-Gruppo">{process.env.NEXT_PUBLIC_EVENT_NAME}</p>
            <div className="bg-loading bg-cover bg-center w-80 h-14"></div>
        </div>
    )
}