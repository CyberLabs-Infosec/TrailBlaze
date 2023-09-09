'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

import Loading from '../../components/Loading';

export default function Page() {
    const [userdata, setUserData] = useState({ username: "" });
    const [loggedin, setLoggedin] = useState(false);

    const router = useRouter();

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

    return (
        loggedin ? 
        <div className="flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900 gap-10">
            
        </div>:
        <div className='text-center text-3xl font-bold text-slate-400'>
            <Loading></Loading>
        </div>
    )
}