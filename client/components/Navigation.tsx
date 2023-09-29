import Link from "next/link"
import React from "react"

interface Props {
    loggedin: boolean;
}

export default function Navbar(props: Props) {
    const navStyle = 'w-28 px-3 py-2 text-lg font-bold text-slate-400 border-2 border-slate-500 hover:bg-violet-600 hover:text-white transition-all hover:border-white'
    return (
        <>
            <Link href="/about"><button className={navStyle}>About</button></Link>
            <Link href="/challenges"><button className={navStyle}>Challs</button></Link>
            <Link href="/team"><button className={navStyle}>Team</button></Link>
            <Link href="/profile"><button className={navStyle}>Profile</button></Link>
            <Link href={ props.loggedin ? "/logout" : "/login"}><button className='w-28 px-3 py-2 text-lg font-bold border-2 text-slate-600 bg-violet-600 text-white transition-all'>{ props.loggedin ? "Logout" : "Login" }</button></Link>
        </>
    )
}