import { challItem } from "./Challenge"

interface Props{
    isVisible: boolean
    setVisible: any
    challJSON: challItem
}

function Card(props: Props){
    function closeWindow(){
        props.setVisible(false)
    }

    return(
        <div className={`flex flex-col bg-black ${ props.isVisible ? "": "hidden"}`}>EditCard for chall, flag: { props.challJSON.prompt }
        <button onClick={ closeWindow }>Hello</button></div>
        
    )
}

export default Card;