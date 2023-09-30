import { useEffect, useState } from "react";
import { challItem } from "./Challenge";
import Cookies from "js-cookie";

interface Props{
    setVisible: any
    challJSON: challItem
}

function EditPrompt(props: Props){
    const [ hints, setHints ] = useState(["this is fake :)"])
    
    useEffect(() => {
        if (props) {
            setHints(props.challJSON.hints)
        }
    }, [props])

    async function submitData(){
        const req = await fetch("/api/admin/editchall", {
            headers: {
                "Authorization": `Bearer ${Cookies.get('token')}`
            },
            method: "POST",
            body: JSON.stringify({
                chall_id: props.challJSON.chall_id,
                title: document.getElementById("challtitle")
            })
        })
        props.setVisible(false)
    }

    const removeHint = (event) => {
        const index = event.target.getAttribute("id");
        let data = [...hints]
        data.splice(index, 1)
        setHints(data)
    }

    const addHint = () => {
        setHints([...hints, ""]);
    }

    const handleChange = (event) => {
        const index = parseInt(event.target.getAttribute("id").slice(6))
        let data = [...hints]
        data[index] = event.target.value;
        setHints(data);
    }

    return(
        <div className="w-11/12 sm:w-fit flex flex-col justify-center rounded-lg pt-4 px-5 pb-5 gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)"}}>
            <div id="challtitle" className="sm:w-150 bg-transparent pb-1 uppercase font-bungee text-xl outline-none  focus:border-purple-600 border-b-2 border-gray-500 text-center" contentEditable="true"> { props.challJSON.title } </div>
            <div>
                <div className="text-slate-400">prompt</div>
                <div className="sm:w-150 bg-transparent p-2 border-2 rounded-md outline-none border-gray-500 focus:border-purple-600 h-fit" id="prompt" contentEditable="true"> { props.challJSON.prompt } </div>
            </div>
            <div>
                <div className="text-slate-400">flag</div>
                <div id="flag" className="sm:w-150 bg-transparent p-2 outline-none  focus:border-purple-600 border-2 border-gray-500 rounded-md" contentEditable="true"> { props.challJSON.flag } </div>
            </div>
            <div></div>
            <div>
                <div className="text-slate-400">hints</div>
                <div className="sm:w-150 flex flex-col bg-transparent px-3 py-4 border-2 rounded-md outline-none border-gray-500 h-fit gap-3" id="hints">
                    <div className="flex gap-3 justify-center">
                        <button onClick={ addHint } className="p-2 flex justify-center items-center gap-2 hover:bg-zinc-600 transition ease-in-out duration-300 rounded-md">
                            <img src="/static/assets/add_icon.svg" width="30px"/>
                            Add hint
                        </button>
                    </div>
                    {
                        hints.map((hint, index) => {
                            return(
                                <div id={ `div-${ index }` }key={ index } className="flex gap-3 items-center">
                                    <input id={`input-${ index }` } className="bg-transparent outline-none  focus:border-purple-600 border-b-2 border-gray-500 grow px-2" value={ hint } onChange={ handleChange }></input>
                                    <button className="w-10 h-10 flex justify-center items-center hover:border rounded-full border-transparent transition ease-in-out duration-300 bg-red-600 hover:bg-red-400 outline-none" onClick={ removeHint }>
                                        <img id={ `${ index }` } src="/static/assets/delete_icon.svg" width="30px"/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <button className="sm:w-1/2 self-center rounded-md text-center p-2 transition duration-500 ease-in hover:border" onClick={ submitData } style={{backgroundColor: "rgba(76, 0, 255, 0.6)"}}>Save</button>
        </div>
    )
}

export default EditPrompt;