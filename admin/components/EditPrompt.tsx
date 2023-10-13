'use client'

import { useEffect, useState } from "react";
import { challItem } from "./Challenge";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props{
    setVisible: any
    challJSON: challItem
}

function EditPrompt(props: Props){
    const [ title, setTitle ] = useState("this is fake title")
    const [ prompt, setPrompt ] = useState("fake prompt")
    const [ hints, setHints ] = useState(["this is fake :)"])
    const [ files, setFiles ] = useState(["fake link"])
    const [ flag, setFlag ] = useState("fake flag")
    const [ challVisibility, setChallVisibilty ] = useState(false)
    const [ points, setPoints ] = useState(0)

    useEffect(() => {
        if (props) {
            setTitle(props.challJSON.title)
            setPrompt(props.challJSON.prompt)
            setHints(props.challJSON.hints)
            setFlag(props.challJSON.flag)
            setChallVisibilty(props.challJSON.visible)
            setPoints(props.challJSON.points)
            setFiles(props.challJSON.files)
        }
    }, [props])

    async function submitData(){
        const chall_id = props.challJSON.chall_id
        const titlePost = title
        const promptPost = prompt
        const flagPost = flag
        const hintArray = hints
        const pointsPost = points
        const visiblePost = challVisibility
        const filesPost = files

        const req = await fetch("/api/admin/editchall", {
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                chall_id, titlePost, promptPost, flagPost, hintArray, pointsPost, visiblePost, filesPost
            })
        })

        const response = await req.json()
        if (response.status == "success"){
            props.setVisible(false)
            alert(`Successfully Updated!`)
            return location.reload()
        }
        alert(`Update failure
            error: ${response.error}
        `)
    }

    const removeHint = (event: any) => {
        const index = event.target.getAttribute("id");
        let data = [...hints]
        data.splice(index, 1)
        setHints(data)
    }

    const removeFile = (event: any) => {
        const index = parseInt(event.target.getAttribute("id").splice(8));
        let data = [...files]
        data.splice(index, 1)
        setFiles(data)
    }

    const addHint = () => {
        setHints([...hints, ""]);
    }

    const addFile = () => {
        setFiles([...files, ""]);
    }

    const changeTitle = () => {
        const titleInput = (document.getElementById("challtitle") as HTMLInputElement).value
        setTitle(titleInput)
    }

    const changePrompt = () => {
        const promptInput = (document.getElementById("prompt") as HTMLTextAreaElement).value
        setPrompt(promptInput)
    }

    const changeFlag = () => {
        const flagInput = (document.getElementById("flag") as HTMLInputElement).value
        setFlag(flagInput)
    }

    const changePoints = () => {
        const pointsInput = (document.getElementById("points") as HTMLInputElement).value
        setPoints(Number.isNaN(parseInt(pointsInput)) ? 0: parseInt(pointsInput))
    }

    const handleChange = (event: any) => {
        const index = parseInt(event.target.getAttribute("id").slice(6))
        let data = [...hints]
        data[index] = event.target.value;
        setHints(data);
    }

    const handleFileChange = (event: any) => {
        const index = parseInt(event.target.getAttribute("id").slice(10))
        let data = [...files]
        data[index] = event.target.value;
        setFiles(data);
    }

    const visibility = () => {
        setChallVisibilty(!challVisibility)
    }

    return(
        <div className="relative w-11/12 sm:w-fit flex flex-col justify-center rounded-lg pt-4 px-5 pb-5 gap-4 top-32 h-fit" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)"}}>
            <button className="bg-red-600 hover:bg-red-400 rounded w-fit self-end transition ease-in-out duration-300" onClick={ () => props.setVisible(false) }> <img src="/static/assets/close_icon.svg" width="30px"/> </button>
            <input id="challtitle" className="sm:w-150 bg-transparent pb-1 font-bungee text-xl outline-none focus:border-indigo-600 border-b-2 border-gray-500 text-center" value={ title }  onChange={ changeTitle }></input>
            <div>
                <div className="text-slate-400">prompt</div>
                <textarea className="sm:w-150 bg-transparent p-2 border-2 rounded-md outline-none border-gray-500 focus:border-indigo-600 h-fit" id="prompt" value={ prompt }  onChange={ changePrompt }></textarea>
            </div>
            <div>
                <div className="text-slate-400">flag</div>
                <input id="flag" className="sm:w-150 bg-transparent p-2 outline-none  focus:border-indigo-600 border-2 border-gray-500 rounded-md" value={ flag } onChange={ changeFlag }></input>
            </div>
            <div></div>
            <div>
                <div className="text-slate-400">hints</div>
                <div className="sm:w-150 flex flex-col bg-transparent px-3 py-4 border-2 rounded-md outline-none border-gray-500 h-fit gap-3" id="hints">
                <button className="w-10 h-10 flex justify-center items-center hover:border rounded-full border-transparent transition ease-in-out duration-300 hover:bg-green-500 outline-none" onClick={ addHint }>
                        <img src="/static/assets/add_icon.svg" width="30px"/>
                    </button>
                    {
                        hints.map((hint, index) => {
                            return(
                                <div id={ `div-${ index }` } key={ index } className="flex gap-3 items-center">
                                    <input id={`input-${ index }`} className="bg-transparent outline-none  focus:border-indigo-600 border-b-2 border-gray-500 grow px-2" value={ hint } onChange={ handleChange }></input>
                                    <button className="w-10 h-10 flex justify-center items-center hover:border rounded-full border-transparent transition ease-in-out duration-300 bg-red-600 hover:bg-red-400 outline-none" onClick={ removeHint }>
                                        <img id={ `${ index }` } src="/static/assets/delete_icon.svg" width="30px"/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <div className="text-slate-400">files</div>
                <div className="sm:w-150 flex flex-col bg-transparent px-3 py-4 border-2 rounded-md outline-none border-gray-500 h-fit gap-3" id="files">
                    <button className="w-10 h-10 flex justify-center items-center hover:border rounded-full border-transparent transition ease-in-out duration-300 hover:bg-green-500 outline-none" onClick={ addFile }>
                        <img src="/static/assets/add_icon.svg" width="30px"/>
                    </button>
                    {
                        files.map((file, index) => {
                            return(
                                <div id={ `filediv-${ index }` } key={ index } className="flex gap-3 items-center">
                                    <input id={`fileinput-${ index }` } className="bg-transparent outline-none  focus:border-indigo-600 border-b-2 border-gray-500 grow px-2" value={ file } onChange={ handleFileChange }></input>
                                    <button className="w-10 h-10 flex justify-center items-center hover:border rounded-full border-transparent transition ease-in-out duration-300 bg-red-600 hover:bg-red-400 outline-none" onClick={ removeFile }>
                                        <img id={ `fileimg-${ index }` } src="/static/assets/delete_icon.svg" width="30px"/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex justify-around w-full p-2">
                <div className="flex items-center gap-2">
                    <div className="text-slate-400">points</div>
                    <input id="points" className="p-1 w-20 text-center bg-transparent outline-none border-b-2 focus:border-indigo-600 border-gray-500" onChange={ changePoints } value={ points }></input>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="text-slate-400">visible</div>
                    <button onClick={ visibility } className="p-2 rounded-md" style={{backgroundColor: `${challVisibility ? "rgba(76, 0, 255, 0.6)": "#94a3b8"} `}}>{challVisibility ? "True": "False"}</button>
                </div>
            </div>
            <button className="rounded-md text-center p-2 transition duration-500 ease-in hover:border" onClick={ submitData } style={{backgroundColor: "rgba(76, 0, 255, 0.6)"}}>Save</button>
        </div>
    )
}

export default EditPrompt;