import { useEffect } from "react"

export default function() {
    const eventStart = new Date(process.env.NEXT_PUBLIC_EVENT_START).getTime();

    useEffect(() => {
        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;
            
        const countDown = setInterval(() => {
            try {
                const timeLeft = eventStart - new Date().getTime();
                document.getElementById("hours").innerText = Math.floor((timeLeft) / (hour)).toString().padStart(2, '0'),
                document.getElementById("minutes").innerText = Math.floor((timeLeft % (hour)) / (minute)).toString().padStart(2, '0'),
                document.getElementById("seconds").innerText = Math.floor((timeLeft % (minute)) / second).toString().padStart(2, '0');
                return () => clearInterval(countDown);
            } catch {
                clearInterval(countDown)
            }
        }, 500);
    }, [])

    return (
        <span className="flex">
            <span className="flex flex-col items-center"><span id="hours"></span><span className="text-base">HOUR</span></span>
            <span>:</span>
            <span className="flex flex-col items-center"><span id="minutes"></span><span className="text-base">MIN</span></span>
            <span>:</span>
            <span className="flex flex-col items-center"><span id="seconds"></span><span className="text-base">SEC</span></span>
        </span>
    )
}