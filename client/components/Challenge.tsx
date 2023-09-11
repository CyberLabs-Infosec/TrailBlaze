import React from "react"

export default function Challenge(props) {
    const togglePrompt = () => {
        document.getElementById("challPrompt").classList.add("hidden");
    }

    return (
        <div id="challPrompt" className="fixed flex justify-center items-center top-0 left-0 h-screen w-full z-20 backdrop-blur hidden">
            <div className="bg-slate-800 rounded-xl p-4 flex flex-col items-center" style={{ height: "400px", width: "600px" }}>
                <div onClick={togglePrompt} className="bg-cross bg-center bg-contain bg-no-repeat relative h-10 w-10 rounded-full left-1/2 ml-7 -mt-7 cursor-pointer"></div>
                <div className="font-bold text-4xl text-slate-400 mb-3">{props.chall.title}</div>
                <hr className="w-full border-slate-500"></hr>
                <div className="h-full p-4">DESCRIPTION</div>
                <hr className="w-full border-slate-500"></hr>
                <div className="flex gap-2 bottom-0 mt-3 w-full px-5">
                    <input className="outline-none px-2 py-3 bg-transparent border-2 border-slate-500 text-slate-300 w-full" placeholder="Enter flag here"></input>
                    <button className="border-2 px-3 text-slate-300 border-slate-300 font-bold bg-violet-500">Submit</button>
                </div>
            </div>
        </div>
    )
}