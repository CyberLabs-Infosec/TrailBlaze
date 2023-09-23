'use client'

import { useState } from "react";
import { User } from "../layout";
import { useRouter } from "next/navigation";


function Login() {
    const [view, setView] = useState(false);
    const user = User();
    const router = useRouter();

    const handleSubmit = async () => {
		const email = (document.getElementById("email") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		const messageBox = (document.getElementById("message") as HTMLElement);

		if (email === "" || password === ""){
			messageBox.innerText = "All fields are required!"
			return;
		}

		const resp = await fetch("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({
					loginMethod: "regular",
					loginEmail: email,
					loginPassword: password
				}),
				headers: {
					"Content-Type": "application/json"
				}
			});
        const jsonResp = await resp.json();
    
        if (jsonResp.status == "fail") {
            messageBox.innerText = jsonResp.error;
        } else {
            user.setLoggedin(true);
            router.push("/");
        }
    }

    const handleShowHide = () => {
        setView(!view);
    }

	const inputClass = "px-4 py-2 w-72 bg-transparent border-b border-gray-500 focus:border-white outline-none"
	return (
		<div className="px-6 pt-6 pb-4 font-mono flex justify-center rounded-lg self-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(2px)"}}>
			<div className="grid grid-cols-1 gap-y-4 justify-items-center">
				<label>Welcome Titan!</label>
				<input
					id="email"
					name="email"
					placeholder="Email"
					type="text"
					className={ inputClass }
				></input>
				<input
					id="password"
					name="password"
					placeholder="Password"
					type={ view ? "text": "password" }
					className={ inputClass }
				></input>
				<button className="px-5 py-2 rounded-md relative duration-300 ease-in" style={{ backgroundColor: "rgba(76, 0, 255, 0.6)" }} onClick={ handleSubmit }>Enter</button>
				<div id="message" className="text-cyan-400"></div>
			</div>
		</div>
	)
}

export default Login;