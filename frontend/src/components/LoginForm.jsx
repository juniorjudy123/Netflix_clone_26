import { useRef, useState } from "react"
import { checkValidData } from "../utils/validate"
import { addUser } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios"

const LoginForm = () => {
	const navigate = useNavigate()
	const [isLogin, setIsLogin] = useState(true)
	const [errorMsg, SetErrorMsg] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()

	const email = useRef(null)
	const password = useRef(null)
	const name = useRef(null)

	const toggleSignInForm = () => {
		setIsLogin(!isLogin)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
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
		setIsLoading(true)

		try {
			if (!isLogin) {
				// SIGN UP
				const response = await axiosInstance.post("register/", {
					name: name.current.value,
					email: email.current.value,
					password: password.current.value,
				})
			} else {
				// LOGIN
				const response = await axiosInstance.post("token/", {
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
			SetErrorMsg(
				error.response?.data?.error ||
					"Login failed. Please check your credentials and try again.",
			)
		} finally {
			setIsLoading(false)
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
				disabled={isLoading}
				className="my-3 flex w-full items-center justify-center gap-2 rounded-sm bg-red-700 p-3 text-sm font-semibold transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
				type="submit"
			>
				{isLoading ? (
					<>
						<span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
						{isLogin ? "Signing In..." : "Signing Up..."}
					</>
				) : isLogin ? (
					"Sign In"
				) : (
					"Sign Up"
				)}
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
