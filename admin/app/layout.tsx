'use client'

import NavBar from '@/components/Navigation'
import '../public/static/css/globals.css'
import '../public/static/css/stars.sass'
import { useState, useContext, createContext, useEffect } from 'react'
import Cookies from 'js-cookie'

interface stateVars{
    loggedin: boolean
    setLoggedin: any
    respHook: boolean
}

const Context = createContext<stateVars>({loggedin: false, setLoggedin: false, respHook: false})
// const Context = createContext(null)

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    const [loggedin, setLoggedin] = useState(false);
    const [respHook, setRespHook] = useState(false);
    const [isMobile, setMobile] = useState(false)

    useEffect(() => {
        setMobile(window.innerWidth <= 640);
    }, [])

    useEffect(() => {
        const verify = async () => {
            const data = await fetch("/api/user/verify", {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('token')}`
                }
            });
            const jsonData = await data.json();
            if (jsonData.status == "success") {
                setLoggedin(true);
            }
            setRespHook(true);
        }
        verify();
    }, [])
	
	return (
		<html lang="en">
			<body className="flex flex-col h-screen w-screen text-white font-Inter">
				<NavBar loggedin={ loggedin } isMobile={ isMobile }/>
				<div id="stars" className='-z-30'></div>
				<div id="stars2" className='-z-40'></div>
				<div id="stars3" className='-z-50'></div>
				<Context.Provider value={{ loggedin, setLoggedin, respHook }}> { children } </Context.Provider>
				<div className='z-40 fixed bottom-5 end-5 text-slate-500'>made by titans@titancrew 👀</div>
			</body>
		</html>
	)
}

// className='flex justify-center w-screen'  in case necessary

export function User() {
    return useContext(Context);
}