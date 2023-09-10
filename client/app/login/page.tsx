'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

import { User } from "../layout";

const inpStyle = "outline-none rounded-md px-3 py-3 shadow-2xl shadow-slate-950 text-slate-400 bg-transparent";
const regOptStyle = "p-3 bg-slate-800 rounded-lg shadow-xl hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex gap-3";

const googleAuthURI = `https://accounts.google.com/o/oauth2/v2/auth?
scope=email profile openid&
response_type=code&
state=pass-through value&
redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}/login/&
client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`

export default function LoginPage() {
    const [code, setCode] = useState(null);
    const [view, setView] = useState(false);
    const user = User();
    const router = useRouter();

    const handleSubmit = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const resp = await toast.promise(fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                loginMethod: "regular",
                loginEmail: email,
                loginPassword: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }), {
            pending: "Please wait, sending you on a journey..."
        });
        const jsonResp = await resp.json();
    
        if (jsonResp.status == "fail") {
            toast.error(jsonResp.error);
            router.push("/login");
        } else {
            toast.success("Welcome!");
            user.setLoggedin(true);
            router.push("/")
        }
    }

    useEffect(() => {
        var url = new URL(window.location.href);
        var c = url.searchParams.get("code");

        setCode(c);
    }, [])

    useEffect(() => {
        if (code != null) {
            const getData = async () => {
                const result = await toast.promise(fetch("/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        loginMethod: "google",
                        code: code
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }), {
                    pending: "Please wait, sending you on a journey..."
                });
                const jsonResult = await result.json();

                if (jsonResult.status == "fail") {
                    toast.error(jsonResult.error);
                    router.push("/login");
                } else {
                    toast.success("Welcome!");
                    user.setLoggedin(true);
                    router.push("/")

                }
            }
            getData();
        }
    }, [code])

    const handleShowHide = () => {
        setView(!view);
    }

    return (
        <div className="flex absolute justify-center items-center w-full h-full min-h-full bg-slate-900">
            <div className="flex absolute justify-center items-center p-2 rounded-xl bg-transparent">
                <div className="h-96 w-96 bg-cover rounded-xl z-10">
                    <div className="w-full h-full bg-rocket bg-cover bg-center rounded-md"></div>
                    <div className="flex h-full w-full -translate-y-full rounded-lg items-end justify-center">
                        <p className="text-center font-extrabold text-5xl mb-80 text-slate-200">HELLO !</p>
                    </div>
                </div>
                <div className="z-10 backdrop-blur-2xl">
                    <div className="flex flex-col gap-3 m-10">
                        <p className="text-center text-3xl font-bold text-slate-400">LOGIN</p>
                        <hr className="border-slate-500"></hr>
                        <input className={ inpStyle } id="email" name="email" placeholder="email"></input>
                        <div className="flex gap-2 justify-center items-center">
                            <input className={ inpStyle } id="password" name="password" type={view ? "text" : "password"} placeholder="password"></input>
                            {view ?
                                <div onClick={handleShowHide} className="h-8 w-8 bg-center bg-no-repeat bg-contain cursor-pointer bg-eyeShow"></div>:
                                <div onClick={handleShowHide} className="h-8 w-8 bg-center bg-no-repeat bg-contain cursor-pointer bg-eyeHide"></div>
                            }
                        </div>
                        <button onClick={ handleSubmit } className="bg-blue-500 text-white p-3 rounded-md shadow-2xl shadow-blue-500/50">Login</button>
                        <p className="text-center text-slate-400 mt-5 text-sm">OR</p>
                        <hr className="border-slate-500"></hr>
                        <div className="flex gap-8 justify-center items-center">
                            <Link href={googleAuthURI}><div className={regOptStyle}><div className="h-6 w-6 bg-google bg-cover bg-center"></div><p className="text-slate-400">Login with google</p></div></Link>
                        </div>
                        <hr className="border-slate-500"></hr>
                        <Link href="/register"><div className="text-blue-400 text-sm text-right underline">do not have account? register</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}