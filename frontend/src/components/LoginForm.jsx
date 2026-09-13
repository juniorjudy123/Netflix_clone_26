import { useRef, useState } from "react"
import { checkValidData } from "../utils/validate"

import { addUser } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
	const navigate = useNavigate()
	const [isLogin, setIsLogin] = useState(true)
	const [errorMsg, SetErrorMsg] = useState(false)
	const dispatch = useDispatch()

	const email = useRef(null)
	const password = useRef(null)
	const name = useRef(null)

	const toggleSignInForm = () => {
		setIsLogin(!isLogin)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		SetErrorMsg("")

		const message = checkValidData(
			email.current.value,
			password.current.value,
			!isLogin ? name.current.value : "",
		)
		if (message) {
			SetErrorMsg(message)
			return
		}

		try {
			if (!isLogin) {
				// SIGN UP
				const response = await axios.post(
					"http://127.0.0.1:8000/api/register/",
					{
						name: name.current.value,
						email: email.current.value,
						password: password.current.value,
					},
				)

				const { access, refresh } = response.data
				console.log("Access:", access)
				console.log("Refresh:", refresh)
			} else {
				// LOGIN
				const response = await axios.post("http://127.0.0.1:8000/api/token/", {
					email: email.current.value,
					password: password.current.value,
				})

				const { access, refresh } = response.data

				localStorage.setItem("accessToken", access)
				localStorage.setItem("refreshToken", refresh)

				const profileResponse = await axios.get(
					"http://127.0.0.1:8000/api/profile/",
					{
						headers: {
							Authorization: `Bearer ${access}`,
						},
					},
				)

				dispatch(addUser(profileResponse.data))
				navigate("/browse")
			}
		} catch (error) {
			console.log(error)
			SetErrorMsg(error.response?.data?.error || "Something went wrong")
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
				ref={email}
				type="email"
				placeholder="email"
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
