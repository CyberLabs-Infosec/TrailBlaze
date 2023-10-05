'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { getNotification, setNotification } from "../../utils/notification";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { User } from "../layout";

export default function Page() {
    const { loggedin, respHook, userData } = User();
    const [scores, setScores] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getScores = async () => {
            const data = await fetch("/api/scoreboard/scores", {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('token')}`
                }
            });
            const jsonData = await data.json();
            if (jsonData.status == "success") {
                setScores(jsonData.scores);
            } else {
                setNotification(true, "info", "Please login again!");
                return router.push("/login")
            }
        }
        getScores();
    }, [])

    useEffect(() => {
        if (respHook && !loggedin) {
            setNotification(true, "info", "Please login first");
            router.push("/login");
        }
    }, [respHook])

    useEffect(() => {
        let toSort = scores;
        toSort.sort((obj1, obj2) => {
            if (obj2.last_solved > obj1.last_solved) {
                return 1;
            } else if (obj2.last_solved < obj1.last_solved) {
                return -1;
            } else {
                return obj2.current_points > obj1.current_points ? 1 : -1;
            }
        })
        setScores(toSort);
    }, [scores])

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
        <div id="container" className="h-full w-full overflow-y-scroll flex flex-col gap-5 pt-32 items-center">
            <p className="text-5xl text-slate-400 font-bold">SCOREBOARD</p>
            <div id="scoreboard" className="rounded-md p-3 flex flex-col gap-2" style={{ width: "700px", minHeight: "200px" }}>
                <div className="grid grid-cols-5 top-0 gap-2">
                    <div className="text-slate-300 col-span-3 bg-violet-500 p-2 text-xl text-center font-bold">TEAMNAME</div>
                    <div className="text-slate-300 col-span-1 bg-violet-500 p-2 text-xl text-center font-bold">SOLVED</div>
                    <div className="text-slate-300 col-span-1 bg-violet-500 p-2 text-xl text-center font-bold">FUEL</div>
                </div>
                {
                    scores.map((obj, i) => {
                        return(
                            <div key={i} className="grid grid-cols-5 top-0 gap-2">
                                <div className="text-slate-300 col-span-3 bg-slate-700 p-2 text-center">{obj.teamname}</div>
                                <div className="text-slate-300 col-span-1 bg-slate-700 p-2 text-center">{obj.last_solved}</div>
                                <div className="text-slate-300 col-span-1 bg-slate-700 p-2 text-center">{obj.current_point}</div>
                            </div>
                        )
                })
                }
            </div>
        </div>
    )
}