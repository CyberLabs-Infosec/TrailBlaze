import React, { useEffect } from "react"

export default function Loading({ text }) {
    useEffect(() => {
        if (text) {
            const texts = JSON.parse(text);
            var val = 1;
            const interval = setInterval(() => {
                try {
                    document.getElementById("banner").innerHTML = texts[val];
                } catch {
                    clearInterval(interval);
                }
                val += 1;
                if (val == texts.length) val = 0;
                return () => clearInterval(interval);
            }, 2000)
        }
    }, [text])

    return (
        <div className="absolute flex flex-col top-0 end-0 z-50 h-screen w-screen bg-slate-800 justify-center items-center">
            <p className="text-slate-400 text-5xl font-Gruppo">{process.env.NEXT_PUBLIC_EVENT_NAME}</p>
            <div className="bg-loading bg-cover bg-center w-80 h-14"></div>
            <div id="banner" className="text-base text-slate-400">please wait</div>
        </div>
    )
}