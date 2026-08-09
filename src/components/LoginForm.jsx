import React, { useState } from "react"

const LoginForm = () => {
	const [isLogin, setIsLogin] = useState(true)

	const toggleSignInForm = () => {
		setIsLogin(!isLogin)
	}
	return (
		<form className="bg-black/70 p-10 w-full max-w-sm rounded-md text-white">
			<h1 className="font-bold text-3xl py-4 ">
				{isLogin ? "Login" : "Register"}
			</h1>
			{!isLogin && (
				<input
					type="text"
					placeholder="Name"
					className="p-4 my-4 bg-gray-800 w-full  "
				/>
			)}
			<input
				type="text"
				placeholder="Email"
				className="p-4 my-4 bg-gray-800 w-full  "
			/>
			<input
				type="password"
				placeholder="Password"
				className="p-4 my-4 bg-gray-800 w-full"
			/>
			<button className="p-4 my-6 bg-red-700 w-full " type="submit">
				{isLogin ? "Sign In" : "Sign Up"}
			</button>
			<p className=" py-4 cursor-pointer " onClick={toggleSignInForm}>
				{isLogin ? "New to Netflix ? Sign Up" : "Already Registered. Sign In"}
			</p>
		</form>
	)
}

export default LoginForm
