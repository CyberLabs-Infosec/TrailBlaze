'use client'

import React, { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

export default function Challenge(props) {
    const successAnime = useRef(null);
    const wrongAnime = useRef(null);

    const togglePrompt = () => {
        document.getElementById("challPrompt").classList.add("hidden");
    }

    const handleSubmit = async () => {
        const flag = (document.getElementById("flag") as HTMLInputElement).value;
        if (!flag) {
            toast.error("Enter a flag first!");
            return;
        }

        (document.getElementById("flag") as HTMLInputElement).value = "";
        
        const res = await toast.promise(fetch("/api/chall/submit", {
            method: "POST",
            body: JSON.stringify({ flag: flag.trim(), chall_id: props.chall.chall_id }),
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`,
                "Content-Type": "application/json"
            }
        }), {
            pending: "Sending flag..."
        })

        const jsonRes = await res.json();

        if (jsonRes.status == "success") {
            jsonRes.correct ? successAnime.current.play() : wrongAnime.current.play()
        } else {
            toast.error(jsonRes.error);
        }
    }

    useEffect(() => {
        const correctHolder = document.getElementById("fbtn-correct");
        if (correctHolder) {
            successAnime.current = anime.timeline({
                easing: 'easeInOutQuad',
                begin: function() {
                    const container = document.getElementById("fbtnBg");
                    if (container) {
                        container.classList.toggle("hidden");
                        document.getElementById("fbtn-correct").classList.toggle("hidden");
                    }
                }
            }).add({
                targets: '#fbtn-correct',
                width: ['0px', '250px'],
            }).add({
                targets: "#fbtn-correct",
                letterSpacing: ["0px", "10px"],
                easing: "spring",
                complete: function() {
                    const container = document.getElementById("fbtnBg");
                    if (container) {
                        container.classList.toggle("hidden");
                        document.getElementById("fbtn-correct").classList.toggle("hidden");
                    }
                }
            });
        }
        const wrongHolder = document.getElementById("fbtn-wrong");
        if (wrongHolder) {
            wrongAnime.current = anime.timeline({
                easing: 'easeInOutQuad',
                begin: function() {
                    const container = document.getElementById("fbtnBg");
                    if (container) {
                        container.classList.toggle("hidden");
                        document.getElementById("fbtn-wrong").classList.toggle("hidden");
                    }
                }
            }).add({
                targets: '#fbtn-wrong',
                width: ['0px', '250px'],
            }).add({
                targets: "#fbtn-wrong",
                letterSpacing: ["0px", "10px"],
                easing: "spring",
                complete: function() {
                    const container = document.getElementById("fbtnBg");
                    if (container) {
                        container.classList.toggle("hidden");
                        document.getElementById("fbtn-wrong").classList.toggle("hidden");
                    }
                }
            });
        }
    }, []);

    useEffect(() => {
        const flagField = document.getElementById("flag");
        flagField.addEventListener("keydown", (e) => {
            if (e.code === 'Enter') handleSubmit();
        })
    }, [])

    return (
        <div id="challPrompt" className="fixed flex justify-center items-center top-0 left-0 h-screen w-full z-20 backdrop-blur hidden">
            <div className="bg-slate-800 rounded-xl p-4 flex flex-col items-center" style={{ height: "400px", width: "600px" }}>
                <div onClick={togglePrompt} className="bg-cross bg-center bg-contain bg-no-repeat relative h-10 w-10 rounded-full left-1/2 ml-7 -mt-7 cursor-pointer"></div>
                <div className="font-bold text-4xl text-slate-400 mb-3">{props.chall.title}</div>
                <hr className="w-full border-slate-500"></hr>
                <div className="h-full p-4">{props.chall.prompt}</div>
                <hr className="w-full border-slate-500"></hr>
                <div className="flex gap-2 bottom-0 mt-3 w-full px-5">
                    <input id="flag" className="outline-none px-2 py-3 bg-transparent border-2 border-slate-500 text-slate-300 w-full" placeholder="Enter flag here"></input>
                    <button onClick={handleSubmit} onSubmit={handleSubmit} className="border-2 px-3 text-slate-300 border-slate-300 font-bold bg-violet-500">Submit</button>
                </div>
            </div>
            <div id="fbtnBg" className="absolute backdrop-blur-lg h-full w-full flex items-center justify-center hidden" style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}>
                <div id="fbtn-correct" className="border-t-2 border-b-2 border-green-300 overflow-hidden flex justify-center items-center hidden">
                    <p className="text-slate-200 text-3xl m-8 text-green-300">CORRECT</p>
                </div>
                <div id="fbtn-wrong" className="border-t-2 border-b-2 border-red-300 overflow-hidden flex justify-center items-center hidden">
                    <p className="text-slate-200 text-3xl m-8 text-red-300">WRONG</p>
                </div>
            </div>
        </div>
    )
}