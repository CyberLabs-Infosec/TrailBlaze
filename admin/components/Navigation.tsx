import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props{
    loggedin: boolean
    isMobile: boolean
}

function NavBar(props: Props){
    var routes = [
        {
            path: "/",
            name: "Home",
            icon: "home_icon"
        },
        {
            path: "/challs",
            name: "Challenges",
            icon: "challs_icon",
        },
        {
            path: "/logs",
            name: "Submissions",
            icon: "logs_icon",
        },
        {
            path: "/users",
            name: "Users",
            icon: "users_icon"
        },
    ]

    if (props.loggedin){
        routes.push({
            path: "/logout",
            name: "Logout",
            icon: "logout_icon"
        });
    } else {
        routes.push({
            path: "/login",
            name: "Login",
            icon: "login_icon",
        });
    }

    let pathname = usePathname() || "/";
    const [hoveredPath, setHoveredPath] = useState(pathname);

    return (
        <>{props.isMobile ? 
        <div className="z-100 sticky top-6 mb-12 p-2 rounded-lg self-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(2px)" }}>
            <nav className="flex gap-4">
                {routes.map((item, index) => {
                    const isActive = item.path === pathname;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="rounded-lg p-2"
                            style={{
                                backgroundColor: `${ isActive ? "rgba(76, 0, 255, 0.6)": ""}`
                            }}
                        >
                            <img src={ `/static/assets/${ item.icon }.svg` } width="30px"></img>
                        </Link>
                    )
                })}
            </nav>
        </div>: 
        <div className="p-2 rounded-lg mb-12 sticky top-6 z-[100] self-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(2px)" }}>
            <nav className="flex gap-2 relative justify-center w-full z-[100]  rounded-lg">
                {routes.map((item, index) => {
                    const isActive = item.path === pathname;
    
                    return (
                        <Link
                            key={item.path}
                            className={`px-7 py-2 rounded-md text-sm lg:text-base font-mono relative no-underline duration-300 ease-in ${
                                    isActive ? "text-zinc-100" : "text-zinc-100"
                                }`}
                            data-active={isActive}
                            href={item.path}
                            onMouseOver={() => setHoveredPath(item.path)}
                            onMouseLeave={() => setHoveredPath(pathname)}
                        >
                            <span>{item.name}</span>
                            {item.path === hoveredPath && (
                                <motion.div
                                    className="absolute bottom-0 left-0 h-full rounded-md -z-10"
                                    layoutId="navbar"
                                    aria-hidden="true"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "rgba(76, 0, 255, 0.6)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.25,
                                        stiffness: 130,
                                        damping: 12,
                                        duration: 0.3,
                                    }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    }</>
    );
}

export default NavBar;