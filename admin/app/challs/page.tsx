'use client'

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

import Challenge from "@/components/Challenge";
import { User } from "../layout";

function Challenges(){
    const { loggedin, respHook } = User();
    const [challenges, setChallenges] = useState([])
    const router = useRouter()

    const getChalls = async () => {
        const challList = await fetch("/api/chall/getchalls", {
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`
            }
        });

        const challJson = await challList.json();
        if (challJson.status == "error")  {
            return router.push("/logout");
        }
        setChallenges(challJson.data);
        console.log(challenges);
    }

    useEffect(() => {
        if (respHook && !loggedin) {
            router.push("/login");
        } else {
            getChalls();
        }
    }, [respHook])

    return (
        <div className="flex overflow-y-auto flex-wrap gap-5 justify-center p-8">
            {
                challenges.map((item, index) =>
                            <Challenge key={ index } title={ item.title } prompt={ item.prompt }/>
                    )
            }
        </div>
    )
}

export default Challenges;