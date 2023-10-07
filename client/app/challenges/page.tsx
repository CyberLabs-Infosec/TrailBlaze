'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

import Loading from '../../components/Loading';
import Challenge from "../../components/Challenge";

import { setNotification, getNotification } from '../../utils/notification';
import { toast } from "react-toastify";

import { User } from "../layout";

export default function Page() {
    const { loggedin, respHook, userData } = User();
    const [currChall, setCurrChall] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [placed, setPlaced] = useState(false);
    const [solved, setSolved] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [currentPoints, setCurrentPoints] = useState(0);

    const router = useRouter();

    const placeOnPath = (obj, i) => {
        var pos = i / (challenges.length - 1);
        var isCheckPoint = obj.checkpoint;

        var trail = (document.getElementById("trail") as unknown as SVGGeometryElement);
        var pathLength = trail.getTotalLength();
        var loc = trail.getPointAtLength(pos * pathLength);

        const conatiner = (document.getElementById("container") as HTMLElement);

        var chall = document.createElement("div");
        chall.setAttribute("class", "challBox");
        if (obj.place < solved) {
            chall.classList.add(`"hover:bg-green-200"`, `bg-green-400`, "cursor-pointer", "transition-all", `${isCheckPoint ? "h-24" : "h-20"}`, `${isCheckPoint ? "w-24" : "w-20"}`);
        } else if (obj.place > solved) {
            chall.classList.add(`${isCheckPoint ? "hover:bg-violet-300" : "hover:bg-slate-600"}`, `${isCheckPoint ? 'bg-violet-500' : 'bg-slate-800'}`, "cursor-pointer", "transition-all", `${isCheckPoint ? "h-24" : "h-20"}`, `${isCheckPoint ? "w-24" : "w-20"}`);
        } else {
            chall.classList.add("hover:bg-yellow-100", "bg-yellow-200", "cursor-pointer", "transition-all", `${isCheckPoint ? "h-24" : "h-20"}`, `${isCheckPoint ? "w-24" : "w-20"}`);
        }
        chall.style.left = (conatiner.clientHeight / 730) * loc.x + "px";
        chall.style.top = (conatiner.clientWidth / 430) * loc.y + "px";
        chall.setAttribute("challNo", obj.place.toString());
        chall.id = `chall-${obj.chall_id.toString()}`;
        chall.addEventListener("click", (e) => {
            var prompt = (document.getElementById("challPrompt") as HTMLElement);
            prompt.classList.remove("hidden");
            setCurrChall(challenges.filter((c) => `chall-${c.chall_id}` == (e.target as HTMLElement).id)[0]);
        })

        chall.innerHTML = `<p style="position: absolute; top: -40px; left: -15px; font-weight: 600; color: #a7adb8; width: max-content; padding: 5px 10px 5px 10px; background-color: #22262e; border-radius: 10px;">${obj.title}</p>`

        document.getElementById("map").appendChild(chall);
    }

    useEffect(() => {
        if (loggedin && currChall != null && !placed) {
            challenges.sort((c1, c2) => {
                if (c1.place > c2.place) {
                    return 1;
                } else {
                    return -1;
                } 
            })
            let i = 0;
            for (var chall of challenges) {
                placeOnPath(chall, i);
                i++;
            }
            setPlaced(true)
        }
    }, [currChall])

    const getChalls = async () => {
        const challs = await fetch("/api/chall/getchalls", {
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`
            }
        });
        const challsToJson = await challs.json();
        if (challsToJson.status == "error")  {
            setNotification(true, "error", "Please login again");
            return router.push("/logout");
        }
        setChallenges(challsToJson.data);
        setTotalPoints(challsToJson.totalPoints);
        setCurrentPoints(challsToJson.currentPoints);
        setSolved(challsToJson.solved);
    }

    useEffect(() => {
        setCurrChall(challenges[0]);
    }, [challenges])

    useEffect(() => {
        if (respHook && !loggedin) {
            setNotification(true, "info", "Please login first");
            router.push("/login");
        } else if (respHook && loggedin) {
            if (userData.team_id == null) {
                setNotification(true, "info", "You need to be in a team to play challenges");
                router.push("/team");
            } else {
                getChalls();
            }
        }
    }, [respHook])

    useEffect(() => {
        const {toShow, type, message} = getNotification();
        if (toShow === "true") {
            switch (type) {
                case "info":
                    toast.info(message);
                    break;
                case "success":
                    toast.success(message);
                    break;
                case "warn":
                    toast.warn(message);
                    break;
                case "error":
                    toast.error(message);
                default:
                    toast(message);
                    break;
            }
            setNotification();
        }
    }, [])

    return (
        loggedin ? currChall != null ?
        <>
        <div className="absolute flex justify-center items-center w-full min-h-screen bg-slate-900 gap-10 h-fit" id="map">
            <div id="scorepanel" className="fixed top-20 right-4 backdrop-blur z-20 flex flex-col gap-2 px-2 py-3 rounded-md justify-center items-center" style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}>
                <p className="text-slate-400 font-bold text-xl">FUEL ({Math.floor((currentPoints / totalPoints) * 100)}%)</p>
                <div className="h-5 w-48 bg-slate-700 flex items-end">
                    <span className="bg-green-300 h-full" style={{ width: `${Math.floor((currentPoints / totalPoints) * 100)}%` }}></span>
                </div>
                <div>
                    <p className="text-slate-400 font-bold">Your fuel decreases {1}% per hr</p>
                </div>
            </div>
            <Challenge chall={currChall} setCurrentPoints={setCurrentPoints}></Challenge>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 730" id="container">
                <path id="trail" d="m 40 51 c 87 12.6667 208 -9 311 44 c 32 21 98 121 -16 150 c -80 16 -172 -19 -257 43 c -28 20 -97 100 5 146 c 104 35 194 -5 267 71 c 33 39 16 87 -3 115 c -25 36 -101.6667 13 -275 53" stroke="#32374d" strokeWidth="1" strokeLinecap="round" strokeDasharray="3,3" fill="none"/>
            </svg>
        </div></>: 
        <div className='text-center text-3xl font-bold text-slate-400'>
            <Loading text={JSON.stringify(["Loading challenges"])}></Loading>
        </div>:
        <div className='text-center text-3xl font-bold text-slate-400'>
            <Loading text=""></Loading>
        </div>
    )
}