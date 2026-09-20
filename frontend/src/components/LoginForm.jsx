import { useRef, useState } from "react"
import { checkValidData } from "../utils/validate"

import { addUser } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"

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

				const profileResponse = await axiosInstance.get("profile/")
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
			className="w-full max-w-sm rounded-md bg-black/70 p-5 text-white sm:p-6"
			onSubmit={handleSubmit}
		>
			<h1 className="py-2 text-2xl font-bold">
				{isLogin ? "Login" : "Register"}
			</h1>

			{!isLogin && (
				<input
					ref={name}
					type="text"
					placeholder="Name"
					className="my-2 w-full rounded-sm bg-gray-800 p-3 text-sm"
				/>
			)}

			<input
				ref={email}
				type="email"
				placeholder="Email"
				className="my-2 w-full rounded-sm bg-gray-800 p-3 text-sm"
			/>

			<input
				ref={password}
				type="password"
				placeholder="Password"
				className="my-2 w-full rounded-sm bg-gray-800 p-3 text-sm"
			/>

			<p className="min-h-5 text-sm text-red-600">{errorMsg}</p>

			<button
				className="my-3 w-full rounded-sm bg-red-700 p-3 text-sm font-semibold transition hover:bg-red-800"
				type="submit"
			>
				{isLogin ? "Sign In" : "Sign Up"}
			</button>

			<p
				className="cursor-pointer py-2 text-sm text-gray-300 hover:text-white"
				onClick={toggleSignInForm}
			>
				{isLogin ? "New to Netflix? Sign Up" : "Already Registered. Sign In"}
			</p>
		</form>
	)
}

export default LoginForm
