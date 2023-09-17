'use client'

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

import Loading from '../../components/Loading';

import { setNotification, getNotification } from '../../utils/notification';

import { User } from '../layout';

export default function Page() {
    const inpStyle = "outline-none rounded-md px-3 py-3 shadow-2xl shadow-slate-950 text-slate-400 bg-transparent";
    const { loggedin, userData, respHook } = User();
    const router = useRouter();

    const handleSubmit = async () => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const adm_no = (document.getElementById("adm_no") as HTMLInputElement).value;

        const data = await toast.promise(fetch("/api/user/edit", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                adm_no
            })
        }), {
            pending: "Editing details..."
        });

        const jsonData = await data.json();

        if (jsonData.status == "fail") {
            toast.error(jsonData.error);
        } else {
            toast.success("Your profile info was edited");
            location.reload();
        }
    }

    useEffect(() => {
        if (respHook && !loggedin) {
            setNotification(true, "info", "Please login first");
            router.push("/login");
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

    return(
        loggedin ? 
        <div className="flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900 gap-10">
            <div className="h-96 w-96 bg-cover rounded-xl z-10">
                <div className="w-full h-full bg-fastAstro bg-s bg-cover bg-center rounded-md"></div>
            </div>
            <div className='flex flex-col gap-3'>
                <p className="text-center text-3xl font-bold text-slate-400">EDIT INFO</p>
                <hr className="border-slate-500"></hr>
                <input className={inpStyle} id='username' name='username' placeholder='full name' defaultValue={userData.username}></input>
                <input className={inpStyle} id='adm_no' name='adm_no' placeholder='Admission No' defaultValue={userData.adm_no}></input>
                <button onClick={handleSubmit} className="bg-violet-600 text-white p-3 rounded-md shadow-lg shadow-violet-500/50">Submit</button>
            </div>
        </div> : <div className='text-center text-3xl font-bold text-slate-400'>
            <Loading text=""></Loading>
        </div>
    )
}