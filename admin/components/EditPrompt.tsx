import { challItem } from "./Challenge";

interface Props{
    setVisible: any
    challJSON: challItem
}

function EditPrompt(props: Props){

    function hidePrompt(){
        console.log((document.getElementById("challtitle") as HTMLInputElement).value);
        props.setVisible(false)
    }

    return(
        <div className="w-11/12 sm:w-fit flex flex-col justify-center rounded-lg pt-4 px-5 pb-5 gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)"}}>
            <div id="challtitle" className="sm:w-150 bg-transparent pb-1 uppercase font-bungee text-xl outline-none  focus:border-purple-600 border-b-2 border-gray-500 text-center" contentEditable="true"> { props.challJSON.title } </div>
            <div>
                <div>prompt</div>
                <div className="sm:w-150 bg-transparent p-2 border-2 rounded-md outline-none border-gray-500 focus:border-purple-600 h-fit" id="prompt" contentEditable="true"> { props.challJSON.prompt } </div>
            </div>
            <div>
                <div>flag</div>
                <div id="flag" className="sm:w-150 bg-transparent p-2 outline-none  focus:border-purple-600 border-2 border-gray-500 rounded-md" contentEditable="true"> { props.challJSON.flag } </div>
            </div>
            {/* <div id="hints" className="sm:w-150 bg-transparent p-2 border rounded-md outline-none focus:border-purple-600 h-fit"> {
                props.challJSON.hints.map((index, hint) => {
                    return(<div key={ index }></div>)
                })
            } </div> */}

            <button className="sm:w-1/2 self-center rounded-md text-center p-2 transition duration-500 ease-in hover:border" onClick={ hidePrompt } style={{backgroundColor: "rgba(76, 0, 255, 0.6)"}}>Click me daddy!</button>
        </div>
    )
}

export default EditPrompt;