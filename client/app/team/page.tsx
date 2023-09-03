'use client'

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

import Loading from '../../components/Loading';
import * as echarts from 'echarts';

export default function Page() {
    const inpStyle = "outline-none rounded-md px-3 py-3 shadow-2xl shadow-slate-950 text-slate-400 bg-transparent";
    const [userdata, setUserData] = useState({ username: null, phone: null, teamname: null });
    const [loggedin, setLoggedin] = useState(false);
    const [team, setTeam] = useState({});
    const router = useRouter();

    useEffect(() => {
        var div = document.getElementById('chart');

        if (div) {
            var myChart = echarts.init(div, 'dark');
        
            myChart.setOption({
                title: {},
                tooltip: {},
                xAxis: {},
                yAxis: {},
                series: [
                {
                    name: 'Score',
                    type: 'line',
                    data: [
                        [128, 100],
                        [300, 300],
                        [432, 400],
                        [765, 450]
                    ]
                }
                ]
            });
        }
    }, [loggedin])

    const handleCreate = async () => {
        const teamname = (document.getElementById("teamname") as HTMLInputElement).value;
        const secret = (document.getElementById("secret") as HTMLInputElement).value;

        const data = await toast.promise(fetch("/api/user/createteam", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teamname, secret
            })
        }), {
            pending: "Creating team..."
        });

        const jsonData = await data.json();

        if (jsonData.status == "fail") {
            toast.error(jsonData.error);
        } else {
            toast.success("Congrats, you started a team!");
            location.reload();
        }
    }

    const handleJoin = async () => {
        const teamname = (document.getElementById("teamname") as HTMLInputElement).value;
        const secret = (document.getElementById("secret") as HTMLInputElement).value;

        const data = await toast.promise(fetch("/api/user/jointeam", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teamname, secret
            })
        }), {
            pending: "Joining team..."
        });

        const jsonData = await data.json();

        if (jsonData.status == "fail") {
            toast.error(jsonData.error);
        } else {
            toast.success("Congrats, you joined a team!");
            location.reload();
        }
    }

    const handleLeave = async () => {
        const data = await toast.promise(fetch("/api/user/leaveteam", {
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`,
            }
        }), {
            pending: "Leaving team..."
        });

        const jsonData = await data.json();

        if (jsonData.status == "fail") {
            toast.error(jsonData.error);
        } else {
            toast.success("You left the team");
            location.reload();
        }
    }

    useEffect(() => {
        const verify = async () => {
            const data = await fetch("/api/user/verify", {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('token')}`
                }
            });
            const jsonData = await data.json();
            if (jsonData.status == "success") {
                setUserData(jsonData.data);
                setLoggedin(true);
            } else {
                router.push("/login")
            }
        }
        verify();
    }, [])

    useEffect(() => {
        const getTeamInfo = async () => {
            const data = await fetch("/api/user/teaminfo", {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('token')}`
                }
            });
            const jsonData = await data.json();
            if (jsonData.status == "success") {
                setTeam(jsonData.data);
            }
        }
        if (loggedin) {
            getTeamInfo();
        }
    }, [loggedin])

    return(
        loggedin ?
        userdata.teamname == null ?
        <div className="flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900 gap-10">
            <div className="h-96 w-96 bg-cover rounded-xl z-10">
                <div className="w-full h-full bg-planets bg-s bg-cover bg-center rounded-md"></div>
            </div>
            <div className='flex flex-col gap-3'>
                <p className="text-center text-3xl font-bold text-slate-400">JOIN / CREATE TEAM</p>
                <hr className="border-slate-500"></hr>
                <input className={inpStyle} id='teamname' name='teamname' placeholder='Team Name'></input>
                <input className={inpStyle} id='secret' name='secret' placeholder='Team Secret' type='password'></input>
                <div className='flex justify-center gap-3 w-full'>
                    <button onClick={handleJoin} className="bg-violet-600 text-white p-3 w-1/2 rounded-md shadow-lg shadow-violet-500/50 grow">Join</button>
                    <button onClick={handleCreate} className="bg-violet-600 text-white p-3 w-1/2 rounded-md shadow-lg shadow-violet-500/50 grow">Create</button>
                </div>
            </div>
        </div> : <div className='flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900'>
            <div className='flex flex-col gap-3'>
                <p className='text-slate-400 text-4xl font-bold'>{userdata.teamname}</p>
                <div className='flex gap-2'>
                {
                    Object.keys(team).map((i) => <div className='text-slate-300 px-3 py-2 bg-slate-800 rounded-md'key={i}>{team[i].username}</div>)
                }
                </div>
                <div id='chart' className='bg-slate-800 rounded-md' style={{ height: "400px", width: "800px" }}></div>
                <button onClick={handleLeave} className='bg-violet-600 text-white p-2 w-32 rounded-md shadow-md shadow-violet-500/50 grow'>Leave Team</button>
            </div>
        </div> : <div className='text-center text-3xl font-bold text-slate-400'>
            <Loading></Loading>
        </div>
    )
}