import Card from "./EditCard";

interface Props{
    title: string
    prompt: string
}

function Challenge(props: Props){

    function handleEdit(){
        console.log("Button clicked!")
    }

    return (
        <div className="w-80 h-80 rounded-lg transform transition duration-500 hover:scale-105 relative" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(2px)" }}>
            <div className="flex justify-center absolute self-center w-80">
                <div className="py-8 font-bungee text-2xl font-thin uppercase">
                    {props.title}
                </div>
            </div>
            <div className="flex flex-col mt-16 h-64 justify-evenly">
                <div className="flex p-3 justify-center">
                    {props.prompt}
                </div>
                <div className="flex gap-2 justify-center w-80">
                    <button className="w-14 h-14 flex justify-center items-center rounded-full hover:border" onClick={ handleEdit } style={{ backgroundColor: "rgba(76, 0, 255)"}}>
                        <img src="/static/assets/edit_icon.svg" width="30px"/>
                    </button>
                </div>
                <Card></Card>
            </div>
        </div>
    )
}

export default Challenge;