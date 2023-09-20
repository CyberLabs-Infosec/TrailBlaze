"use client"

function Login() {
	const inputClass = "px-4 py-2 w-64 bg-transparent border-b outline-none"
	return (
		<div className="px-6 pt-6 pb-4 font-mono flex justify-center rounded-lg self-center mt-36" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(2px)"}}>
			<form className="grid grid-cols-1 gap-y-4 justify-items-center">
				<label>Welcome Titan!</label>
				<input
					name="email"
					placeholder="Email"
					type="text"
					className={ inputClass }
				></input>
				<input
					name="password"
					placeholder="Password"
					type="password"
					className={ inputClass }
				></input>
				<button className="px-5 py-2 rounded-md relative duration-300 ease-in" style={{ backgroundColor: "rgba(76, 0, 255, 0.6)" }}>Enter</button>
			</form>
		</div>
	)
}

export default Login;