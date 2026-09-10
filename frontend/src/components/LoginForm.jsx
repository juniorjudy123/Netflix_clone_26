import { useRef, useState } from "react"
import { checkValidData } from "../utils/validate"

import { addUser } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import axios from "axios"

const LoginForm = () => {
	const [isLogin, setIsLogin] = useState(true)
	const [errorMsg, SetErrorMsg] = useState(false)
	const dispatch = useDispatch()

	const username = useRef(null)
	const password = useRef(null)
	const name = useRef(null)

	const toggleSignInForm = () => {
		setIsLogin(!isLogin)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const message = checkValidData(
			username.current.value,
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
				.then(async (userCredential) => {
					const user = userCredential.user

					await updateProfile(user, {
						displayName: name.current.value,
						photoURL: "https://example.com/jane-q-user/profile.jpg",
					})

					await user.reload()

					const updatedUser = auth.currentUser

					dispatch(
						addUser({
							uid: updatedUser.uid,
							email: updatedUser.email,
							displayName: updatedUser.displayName,
							photoURL: updatedUser.photoURL,
						}),
					)
				})
				.catch((error) => {
					SetErrorMsg(error.code + " - " + error.message)
				})
		} else {
			try {
				const response = await axios.post("http://127.0.0.1:8000/api/token/", {
					username: username.current.value,
					password: password.current.value,
				})

				console.log(response.data)
			} catch (error) {
				SetErrorMsg("Invalid username or password")
			}
		}
	}

	return (
		<form
			className="bg-black/70 p-10  w-full max-w-sm rounded-md text-white"
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
				ref={username}
				type="text"
				placeholder="Username"
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
