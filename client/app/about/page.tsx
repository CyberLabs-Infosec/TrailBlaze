'use client'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const storyStyle = "text-slate-400 text-5xl"

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
            scale: "4",
            letterSpacing: "3px",
            duration: 5
        });

        tl.to("#welcome", {
            scrollTrigger: {
                trigger: "#headingTrigger",
                start: "top top",
                end: "bottom 60%",
                scrub: 1
            },
            opacity: "0",
            duration: 5
        })

        let storyBoards = gsap.utils.toArray(".story");

        tl.to(storyBoards, {
            xPercent: -100 * (storyBoards.length - 1),
            scrollTrigger: {
                trigger: "#storyBoard",
                scrub: 1,
                pin: true,
                snap: {
                    snapTo: 0.01,
                    ease: "none"
                },
                end: () => "+=" + (document.querySelector("#storyBoard") as HTMLElement).offsetWidth
            },
            ease: "none"
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
            scale: "4",
            letterSpacing: "3px",
            duration: 5
        })

        tl.to("#howToQues", {
            scrollTrigger: {
                trigger: "#howToQues",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true
            },
            duration: 5
        })

        tl.to("#questionMark", {
            scrollTrigger: {
                trigger: "#howToQues",
                start: "center center",
                end: "bottom top",
                scrub: 1
            },
            duration: 5,
            rotate: "360",
            scale: "7",
            x: "-500",
            ease: "none"
        })

    }, [])

    return (
        <div className="scrollElement bg-slate-900" style={{ height: "200vh" }}>
            <div id="headingTrigger" className="relative w-full h-screen flex justify-center items-center">
                <div id="welcome" className="fixed w-full opacity-1 font-Dela text-slate-300 text-center text-9xl flex flex-col justify-center items-center">
                    <p>WELCOME TO</p> <span className="fancy">TRAILBLAZE</span> {/* credits :- https://codepen.io/enbee81/pen/WNdKLBY */}
                    <div className="relative text-slate-400 w-min font-bold text-xl translate-y-32 flex flex-col gap-2 items-center"><p>SCROLL</p><span className="relative flex bg-downArrow bg-center bg-contain bg-no-repeat h-8 w-8"></span></div>
                </div>
            </div>
            <p id="heading" className="fixed top-32 opacity-0 w-full text-base font-bold text-slate-300 text-center z-20 scale-0">THE LOST ASTRONAUT</p>
            <div id="storyBoard" className="h-screen flex" style={{ width: "300vw" }}>
                <div className="story h-full w-full bg-slate-900 flex justify-center items-center">
                    <div className="bg-slate-700 h-full w-full flex justify-center items-center">
                        <p className={storyStyle}>Astronaut starts from earth</p>
                    </div>
                </div>
                <div className="story h-full w-full bg-slate-900 justify-center items-center">
                    <div className="bg-slate-800 h-full w-full flex justify-center items-center">
                        <p className={storyStyle}>Astronaut's rocket is wrecked</p>
                    </div>
                </div>
                <div className="story h-full w-full bg-slate-900 justify-center items-center">
                    <div className="bg-slate-700 h-full w-full flex justify-center items-center">
                        <p className={storyStyle}>Help astronaut reach earth..</p>
                    </div>
                </div>
            </div>
            <div id="disappearTrigger" className="relative w-full h-screen bg-slate-900">
                <div id="howToQues" className="h-full w-full flex justify-center items-center">
                    <div className="text-7xl text-slate-300 font-bold flex gap-2"><div>HOW DO I PLAY THIS GAME</div><div id="questionMark">?</div></div>
                </div>
            </div>
            <div className="h-screen w-full bg-slate-900"></div>
            <p id="howtoHeading" className="fixed top-32 opacity-0 w-full text-base font-bold text-slate-300 text-center z-20 scale-0">JOIN US AT WORKSHOP</p>
            <div id="howTo" className="w-full h-screen bg-slate-900"></div>
        </div>
    )
}