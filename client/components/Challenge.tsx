'use client'

import React, { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import swal from 'sweetalert';

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
            if (jsonRes.correct) {
                const challBox = document.getElementById(`chall-${props.chall.chall_id}`);
                const nextChallBox = document.getElementById(`chall-${props.chall.chall_id + 1}`);
                challBox.classList.remove('bg-yellow-200', 'hover:bg-yellow-100');
                challBox.classList.add('bg-green-400', 'hover:bg-green-200');

                const res = await fetch ("/api/chall/getfuel", {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('token')}`,
                    }
                })
                const resJson = await res.json();
                props.setCurrentPoints(resJson.fuel);

                if (nextChallBox) {
                    nextChallBox.classList.remove('bg-slate-800', 'hover:bg-violet-300', 'bg-violet-500', 'hover:bg-slate-600');
                    nextChallBox.classList.add('bg-yellow-200', 'hover:bg-yellow-100');
                }
            }
        } else {
            toast.error(jsonRes.error);
        }
    }

    const handleEnter = async (event) => {
        if (event.code == "Enter") {
            handleSubmit();
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

    const downloadFile = (e) => {
        const fileUrl = e.target.dataset.url;
        fetch(fileUrl, {
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`
            }
        }).then((res) => {
            if (res.status == 200) {
                return res.blob();
            } else {
                toast.error("The file could not be downloaded, please contact admin");
                return null;
            }
        }).then((blob) => {
            if (blob == null) return;
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            document.body.appendChild(a);
            a.click();    
            a.remove();
        })
    }

    return (
        <div id="challPrompt" className="fixed flex justify-center items-center top-0 left-0 h-screen w-full z-20 backdrop-blur hidden">
            <div className="relative bg-slate-800 rounded-xl p-4 flex flex-col items-center" style={{ minHeight: "400px", width: "600px" }}>
                <div onClick={togglePrompt} className="bg-cross bg-center bg-contain bg-no-repeat relative h-10 w-10 rounded-full left-1/2 ml-8 -mt-8 cursor-pointer"></div>
                <div className="absolute -top-16 left-0 text-slate-400 bg-slate-800 rounded-lg p-3 text-2xl font-bold">Fuel: +{props.chall.points}</div>
                <div className="font-bold text-4xl text-slate-400 mb-3">{props.chall.title}</div>
                <hr className="w-full border-slate-500"></hr>
                <div className="relative h-max p-4 text-slate-400 text-lg flex grow">{props.chall.prompt}</div>
                <div className="flex gap-3 m-3">
                    {
                        props.chall.files.map((k, i) => <div onClick={downloadFile} data-url={`${k}?chall_id=${props.chall.chall_id}&place=${props.chall.place}`} key={i} className="text-blue-400 underline cursor-pointer">{k.split("/").slice(-1)}</div>)
                    }
                </div>
                <div className="absolute text-slate-400 font-bold -bottom-14 right-0 p-3 bg-slate-800 rounded-lg">Author: {props.chall.author}</div>
                <hr className="w-full border-slate-500 bottom-20"></hr>
                <div className="relative flex gap-2 mt-3 w-full px-5 bottom-0">
                    <input onKeyDown={handleEnter} id="flag" className="outline-none px-2 py-3 bg-transparent border-2 border-slate-500 text-slate-300 w-full" placeholder="Enter flag here"></input>
                    <button onClick={handleSubmit} className="border-2 px-3 text-slate-300 border-slate-300 font-bold bg-violet-500">Submit</button>
                </div>
                <div className="absolute -left-24 flex gap-2 flex-col">
                    {
                        props.chall.hints.map((k, i) => <div key={i} onClick={() => swal(k)} className="cursor-pointer p-3 text-slate-400 text-xl bg-slate-800 rounded-lg font-bold">Hint {i}</div>)
                    }
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