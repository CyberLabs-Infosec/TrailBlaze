import { challItem } from "./Challenge"

interface Props{
    isVisible: boolean
    challJSON: challItem
}

function Card(props: Props){
    return(
        <div className={`${ props.isVisible ? "": "hidden"}`}>EditCard for chall, flag: { props.challJSON.title }</div>
    )
}

export default Card;