'use client'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const storyStyle = "text-slate-300 text-4xl px-32 tracking-wider font-Raleway leading-10 text-center"

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
            <p id="heading" className="fixed top-32 opacity-0 w-full text-base font-black text-slate-300 text-center z-20 scale-0 mix-blend-difference">THE LOST ASTRONAUT</p>
            <div id="storyBoard" className="h-screen flex" style={{ width: "300vw" }}>
                <div className="story h-full w-full bg-slate-900 flex justify-center items-center bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/static/assets/slide_1.jpg')" }}>
                    <div className="relative h-full w-full flex justify-center items-center" style={{ backgroundColor: "rgba(20, 20, 20, 0.75)" }}>
                        <p className={storyStyle}>
                            The Gaia Dominion, humanity’s newest world level government, created in 3000 AD, enlists Commander Alex Mercer, as the vanguard in their space exploration trying to extend their reaches towards the uncharted expanse outside the milky way. Alex's spacecraft, the Odyssey, hurtles through the fabric of spacetime on a fateful mission to explore the Triangulum Galaxy.
                        </p>
                        <p className="absolute text-slate-400 font-md bottom-32">Image credits: Hello Games (No Man's Sky)</p>
                    </div>
                </div>
                <div className="story h-full w-full bg-slate-900 flex justify-center items-center bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/static/assets/slide_2.jpg')" }}>
                    <div className="relative h-full w-full flex justify-center items-center" style={{ backgroundColor: "rgba(20, 20, 20, 0.75)" }}>
                        <p className={storyStyle}>
                            Suddenly, a catastrophic malfunction engulfs his ship, spiralling it out of control and forcing a crash-landing on an uncharted planet within the Triangulum Galaxy. Regaining consciousness after the crash, Alex finds himself alone and stranded. The Odyssey lies in ruins, scattered across a landscape adorned with unknown flora and peculiar geological formations. The sky above is a mesmerising blend of colours, dancing with an otherworldly light.
                        </p>
                        <p className="absolute text-slate-400 font-md bottom-32">Image credits: Hello Games (No Man's Sky)</p>
                    </div>
                </div>
                <div className="story h-full w-full bg-slate-900 flex justify-center items-center bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/static/assets/slide_3.jpg')" }}>
                    <div className="relative h-full w-full flex justify-center items-center" style={{ backgroundColor: "rgba(20, 20, 20, 0.75)" }}>
                        <p className={storyStyle}>
                            Survival becomes Alex's immediate priority. On further exploration Alex finds the ruins of an ancient technology civilization on the planet and learns about their usage of ‘luminite’ as a fuel to power their devices. Armed with his specialised cybersecurity skills during the astronaut training program, Alex embarks on this mission to reach home.
                        </p>
                        <p className="absolute text-slate-400 font-md bottom-32">Image credits: Hello Games (No Man's Sky)</p>
                    </div>
                </div>
            </div>
            <div id="disappearTrigger" className="relative w-full h-screen bg-slate-900">
                <div id="howToQues" className="h-full w-full flex justify-center items-center">
                    <div className="text-7xl text-slate-300 font-bold flex gap-2"><div>HOW DO I PLAY THIS GAME</div><div id="questionMark">?</div></div>
                </div>
            </div>
            <div className="h-screen w-full bg-slate-900"></div>
            <p id="howtoHeading" className="fixed top-32 opacity-0 w-full text-base font-bold text-slate-300 text-center z-20 scale-0 mix-blend-exclusion">JOIN US AT WORKSHOP</p>
            <div id="howTo" className="w-full h-screen bg-slate-900 p-32 flex justify-center items-center">
                <div className="relative top-4 h-full w-full rounded-lg bg-bottom bg-cover bg-no-repeat" style={{ backgroundImage: "url('/static/assets/venue.png')" }}>
                    <div className="h-full w-full rounded-lg backdrop-blur-sm grid grid-cols-2 grid-rows-2 gap-8 p-8" style={{ backgroundColor: "rgba(50, 50, 50, 0.7)" }}>
                        <div className="flex grid-cols-1 grid-rows-1 rounded-lg flex flex-col items-center p-4 gap-4">
                            <p className="text-slate-300 font-bold text-5xl text-center">VENUE</p>
                            <hr className="border-2 border-slate-400 w-full"></hr>
                            <p className="font-bold text-2xl text-slate-300">TBD</p>
                        </div>
                        <div className="flex grid-cols-1 grid-rows-1 rounded-lg"></div>
                        <div className="flex grid-cols-1 grid-rows-1 rounded-lg"></div>
                        <div className="flex grid-cols-1 grid-rows-1 rounded-lg flex flex-col items-center p-4 gap-4">
                            <p className="text-slate-300 font-bold text-5xl text-center">CONTACT</p>
                            <hr className="border-2 border-slate-400 w-full"></hr>
                            <div className="flex flex-col gap-3">
                                <p className="font-bold text-2xl text-slate-300 tracking-wide">SUMIT GUPTA: 9309779260</p>
                                <p className="font-bold text-2xl text-slate-300 tracking-wide">JIHENDRA NADH: 8688842828</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}