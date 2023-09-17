'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

import Loading from '../../components/Loading';
import Challenge from "../../components/Challenge";

import { setNotification, getNotification } from '../../utils/notification';
import { toast } from "react-toastify";

export default function Page() {
    const [userdata, setUserData] = useState({ username: "" });
    const [loggedin, setLoggedin] = useState(false);
    const [currChall, setCurrChall] = useState(null);
    const [challenges, setChallenges] = useState([]);

    const router = useRouter();

    const placeOnPath = (obj) => {
        var pos = obj.place / (challenges.length - 1);
        var isCheckPoint = obj.checkpoint;

        var trail = (document.getElementById("trail") as unknown as SVGGeometryElement);
        var pathLength = trail.getTotalLength();
        var loc = trail.getPointAtLength(pos * pathLength);

        const conatiner = (document.getElementById("container") as HTMLElement);

        var chall = document.createElement("div");
        chall.setAttribute("class", "challBox");
        chall.classList.add(`${isCheckPoint ? "hover:bg-violet-300" : "hover:bg-slate-600"}`, `${isCheckPoint ? 'bg-violet-500' : 'bg-slate-800'}`, "cursor-pointer", "transition-all", `${isCheckPoint ? "h-24" : "h-20"}`, `${isCheckPoint ? "w-24" : "w-20"}`);
        chall.style.left = (conatiner.clientHeight / 350) * loc.x + "px";
        chall.style.top = (conatiner.clientWidth / 350) * loc.y + "px";
        chall.setAttribute("challNo", obj.place.toString());
        chall.addEventListener("click", (e) => {
            var prompt = (document.getElementById("challPrompt") as HTMLElement);
            prompt.classList.remove("hidden");
            setCurrChall(challenges[parseInt((e.target as HTMLElement).getAttribute("challNo"))]);
        })
        document.getElementById("map").appendChild(chall);
    }

    useEffect(() => {
        if (loggedin && currChall != null) {
            for (var chall of challenges) {
                placeOnPath(chall);
            }
        }
    }, [currChall])

    useEffect(() => {
        const getChalls = async () => {
            const challs = await fetch("/api/chall/getchalls", {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('token')}`
                }
            });
            const challsToJson = await challs.json();
            if (challsToJson.status == "success") {
                if (!challsToJson.user.team_id) {
                    setNotification(true, "info", "Please join a team first!");
                    return router.push("/team");
                } else {
                    setUserData(challsToJson.user);
                    setLoggedin(true);
                }
            } else {
                setNotification(true, "error", "Please login");
                return router.push("/");
            }
            setChallenges(challsToJson.data);
        }
        getChalls();
    }, [])

    useEffect(() => {
        setCurrChall(challenges[0]);
    }, [challenges])

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
            <Challenge chall={currChall}></Challenge>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" id="container">
                <path id="trail" d="m 54 29 c 87 12.6667 208 -9 261 38 c 28 27 23 62 -11 73 c -80 16 -172 -19 -250 15 c -33 16 -21 66 4 69 c 89 11 161 -33 257 14 c 29 17 27 25 21 48 c -7 27 -101.6667 13 -151 18" stroke="#32374d" strokeWidth="1" strokeLinecap="round" strokeDasharray="3,3" fill="none"/>
            </svg>
        </div></>: 
        <div className='text-center text-3xl font-bold text-slate-400'>
            <Loading text="Loading challenges"></Loading>
        </div>:
        <div className='text-center text-3xl font-bold text-slate-400'>
            <Loading text=""></Loading>
        </div>
    )
}