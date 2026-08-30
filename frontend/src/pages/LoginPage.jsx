import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
import { BG_URL } from "../utils/constants"

const LoginPage = () => {
	return (
		<div>
			<Header />
			<div className="absolute inset-0 -z-10">
				<img
					className=" h-full w-full object-cover"
					src={BG_URL}
					alt="background-img"
				/>
			</div>
			<div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
				<LoginForm />
			</div>
		</div>
	)
}

export default LoginPage
