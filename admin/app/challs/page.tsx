'use client'

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

import Challenge from "@/components/Challenge";
import { User } from "../layout";
import EditPrompt from "@/components/EditPrompt";
import { challItem } from "@/components/Challenge";

function Challenges(){
    const { loggedin, respHook } = User();
    const [challenges, setChallenges] = useState([])
    const router = useRouter()
    const [isVisible, setVisible] = useState(false)
    const [cValue, setValue] = useState<challItem>({chall_id: -1,
        title: "",
        prompt: "",
        place: -1,
        checkPoint: false,
        flag: "",
        points: -1,
        hints: [""],
        solves: -1,
        visible: false,
        files: [""]
    })

    const getChalls = async () => {
        const challList = await fetch("/api/admin/getchalls", {
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`
            }
        });

        const challJson = await challList.json();
        if (challJson.status == "fail")  {
            return router.push("/logout");
        }
        console.log(challJson);
        setChallenges(challJson.data);
    }

    useEffect(() => {
        if (respHook && !loggedin) {
            router.push("/login");
        } else {
            getChalls();
        }
    }, [respHook])

    return (
        <>
            <div className={ `z-30 flex fixed justify-center w-full h-screen backdrop-blur-2xl ${isVisible ? "": "hidden"}` }>
                <EditPrompt challJSON={ cValue } setVisible={ setVisible }></EditPrompt>
            </div>
            <div className={ `flex overflow-y-auto flex-wrap gap-5 justify-center p-8` }>
                {
                    challenges.map((item, index) =>
                        <Challenge key={ index } challJSON={ item } setVisible={ setVisible } setValue={ setValue } />
                    )
                }
            </div>
        </>
    )
}

export default Challenges;