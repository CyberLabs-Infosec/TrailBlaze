import React from "react";
import Link from "next/link";

interface Props{
    loggedin: boolean
}

function NavBar(props: Props){
    var routes = {
        "/": "Dashboard",
        "/challs": "Challenges",
        "/logs": "Submissions",
        "/users": "Users"
    }

    if (props.loggedin){
        routes["/logout" as keyof typeof routes] = "Logout";
    } else {
        routes["/login" as keyof typeof routes] = "Login";
    }
 
    return (
        <div className="flex flex-col w-48 h-3/5 self-center justify-center rounded-md fixed backdrop-blur-sm ml-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
            {
                Object.entries(routes)
                .map( ([key, value]) => <div className="flex flex-col items-center" key={ key } ><Link href={ key }><button className="px-2 py-2 text-center font-mono hover:bg-violet-800 w-48 rounded-lg transition duration-300"> { value } </button></Link><div id="seperator"></div></div>)
            }
        </div>
    )
}

export default NavBar;