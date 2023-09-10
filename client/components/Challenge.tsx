import React from "react"

export default function Challenge(props) {
    const togglePrompt = () => {
        document.getElementById("challPrompt").classList.add("hidden");
    }

    return (
        <div id="challPrompt" className="fixed flex justify-center items-center top-0 left-0 h-screen w-full z-20 backdrop-blur hidden">
            <div className="bg-slate-800 rounded-xl" style={{ height: "400px", width: "600px" }}>
                <div onClick={togglePrompt} className="bg-cross bg-center bg-contain bg-no-repeat relative h-10 w-10 rounded-full left-full -top-10"></div>
                <div>{JSON.stringify(props.chall)}</div>
            </div>
        </div>
    )
}