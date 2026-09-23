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
	const [successMsg, setSuccessMsg] = useState("")
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
			setIsLoading(false)
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
				password.current.value = ""
				setSuccessMsg("Account created successfully. Please sign in.")
				SetErrorMsg("")
				setIsLogin(true)
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
					"Authentication failed. Please try again.",
			)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<form
			className="w-full max-w-sm rounded-md bg-black/70 p-4 text-white sm:p-6"
			onSubmit={handleSubmit}
		>
			<h1 className="pb-3 text-2xl font-bold">
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
			{!isLogin && (
				<p className="px-1 text-xs leading-5 text-gray-400">
					Use at least 8 characters, including uppercase, lowercase, and a
					number.
				</p>
			)}

			<p className="min-h-5 text-sm text-green-500">{successMsg}</p>

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
				className="cursor-pointer py-0 text-center text-sm text-gray-400 transition hover:text-white"
				onClick={toggleSignInForm}
			>
				{isLogin ? (
					<>
						New to{" "}
						<span className="font-bold tracking-wide text-white">
							PRIME<span className="text-red-600">Time</span>
						</span>
						?{" "}
						<span className="font-semibold text-white hover:text-red-400">
							Sign Up
						</span>
					</>
				) : (
					<>
						Already registered?{" "}
						<span className="font-semibold text-red-500 hover:text-red-400">
							Sign In
						</span>
					</>
				)}
			</p>
		</form>
	)
}

export default LoginForm
