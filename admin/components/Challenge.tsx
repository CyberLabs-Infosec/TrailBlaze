'use client'

export interface challItem{
    chall_id: number
    title: string
    prompt: string
    place: number
    checkPoint: boolean
    flag: string
    points: number
    hints: Array<string>
    files: Array<string>
    solves: number
    visible: boolean
}

interface Props{
    challJSON: challItem
    setVisible: any
    setValue: any
}

function Challenge(props: Props){
    function handleEdit(){
        console.log("tried to open me!")
        props.setVisible(true);
        props.setValue(props.challJSON);
    }

    return (

        <div className="w-80 h-80 rounded-lg transform transition duration-500 hover:scale-105" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(2px)" }}>
            <div className="flex justify-center absolute self-center w-80">
                <div className="py-8 font-bungee text-2xl font-thin uppercase">
                    {props.challJSON.title}
                </div>
            </div>
            <div className="flex flex-col mt-16 h-64 justify-evenly">
                <div className="flex p-3 justify-center text-ellipsis overflow-scroll">
                    { props.challJSON.prompt }
                </div>
                <div className="flex gap-2 justify-center w-80 mb-4">
                    <button className="w-14 h-14 flex justify-center items-center rounded-full hover:border" onClick={ handleEdit } style={{ backgroundColor: "rgba(76, 0, 255, 0.6)"}}>
                        <img src="/static/assets/edit_icon.svg" width="30px"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Challenge;