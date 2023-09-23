'use client'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function() {
    useEffect(() => {
        let tl = gsap.timeline()

        tl.to("#heading", {
            scrollTrigger: {
                trigger: "#headingTrigger",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            opacity: "1",
            fontSize: "70px",
            letterSpacing: "3px",
            duration: 3,
            ease: "none"
        });

        tl.to("#welcome", {
            scrollTrigger: {
                trigger: "#headingTrigger",
                start: "top top",
                end: "bottom 60%",
                scrub: 1
            },
            opacity: "0",
            duration: 3
        })

        let storyBoards = gsap.utils.toArray(".story");

        tl.to(storyBoards, {
            xPercent: -100 * (storyBoards.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#storyBoard",
                scrub: 1,
                pin: true,
                snap: {
                    snapTo: 0.05,
                    ease: "none",
                },
                end: () => "+=" + (document.querySelector("#storyBoard") as HTMLElement).offsetWidth
            }
        })

        tl.from("#heading", {
            scrollTrigger: {
                trigger: "#disappearTrigger",
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1
            },
            opacity: "1",
            duration: 3
        })

        tl.to("#howtoHeading", {
            scrollTrigger: {
                trigger: "#howTo",
                start: "top center",
                end: "bottom bottom",
                scrub: 1
            },
            opacity: "1",
            fontSize: "70px",
            letterSpacing: "3px",
            duration: 3,
            ease: "none"
        })

        tl.to("#howToQues", {
            scrollTrigger: {
                trigger: "#howToQues",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true
            },
            duration: 3
        })

    }, [])

    return (
        <div className="scrollElement bg-slate-900" style={{ height: "200vh" }}>
            <div id="headingTrigger" className="relative w-full h-screen"></div>
            <p id="welcome" className="fixed w-full opacity-1 font-bold text-slate-300 text-center text-7xl" style={{ top: "50vh" }}>WELCOME TO TRAILBLAZE</p>
            <p id="heading" className="fixed top-32 opacity-0 w-full text-base font-bold text-slate-300 text-center z-20" style={{ fontSize: "0px" }}>THE LOST ASTRONAUT</p>
            <div id="storyBoard" className="h-screen flex overflow-x-scroll" style={{ width: "300vw" }}>
                <div className="story h-full w-full bg-slate-900 flex justify-center items-center">
                    <div className="bg-slate-600 h-full w-full"></div>
                </div>
                <div className="story h-full w-full bg-slate-900">
                    <div className="bg-slate-700 h-full w-full"></div>
                </div>
                <div className="story h-full w-full bg-slate-900">
                    <div className="bg-slate-600 h-full w-full"></div>
                </div>
            </div>
            <div id="disappearTrigger" className="relative w-full h-screen bg-slate-900">
                <div id="howToQues" className="h-full w-full flex justify-center items-center">
                    <p className="text-7xl text-slate-300 font-bold">HOW DO I PLAY THIS GAME ?</p>
                </div>
            </div>
            <div className="h-screen w-full bg-slate-900"></div>
            <p id="howtoHeading" className="fixed top-32 opacity-0 w-full text-base font-bold text-slate-300 text-center z-20">HOW TO PLAY ?</p>
            <div id="howTo" className="w-full h-screen bg-slate-900"></div>
        </div>
    )
}