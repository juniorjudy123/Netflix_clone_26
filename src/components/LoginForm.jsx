import { useRef, useState } from "react"
import { checkValidData } from "../utils/validate"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../utils/firebase"

const LoginForm = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [errorMsg, SetErrorMsg] = useState(false)

	const email = useRef(null)
	const password = useRef(null)
	const name = useRef(null)

	const toggleSignInForm = () => {
		setIsLogin(!isLogin)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const message = checkValidData(
			email.current.value,
			password.current.value,
			!isLogin ? name.current.value : "",
		)
		if (message) {
			SetErrorMsg(message)
			return
		}
		if (!isLogin) {
			createUserWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value,
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user
					console.log(user)
					// ...
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					SetErrorMsg(errorCode + "- " + errorMessage)
					// ..
				})
		} else {
			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value,
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user
					console.log(user)
					// ...
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					SetErrorMsg(errorCode + "- " + errorMessage)
				})
		}
	}

	return (
		<form
			className="bg-black/70 p-10 w-full max-w-sm rounded-md text-white"
			onSubmit={handleSubmit}
		>
			<h1 className="font-bold text-3xl py-4 ">
				{isLogin ? "Login" : "Register"}
			</h1>
			{!isLogin && (
				<input
					ref={name}
					type="text"
					placeholder="Name"
					className="p-4 my-4 bg-gray-800 w-full  "
				/>
			)}
			<input
				ref={email}
				type="text"
				placeholder="Email"
				className="p-4 my-4 bg-gray-800 w-full  "
			/>
			<input
				ref={password}
				type="password"
				placeholder="Password"
				className="p-4 my-4 bg-gray-800 w-full"
			/>
			<p className=" text-red-600">{errorMsg}</p>
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
