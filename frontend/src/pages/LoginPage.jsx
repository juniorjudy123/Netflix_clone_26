import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
import BackendTest from "../components/BackendTest"

const LoginPage = () => {
	return (
		<div>
			<Header />
			{/* <div>
				<img
					className="absolute inset-0 h-full w-full object-cover"
					src="https://assets.nflxext.com/ffe/siteui/vlv3/0ce6c17e-e188-4f13-aaf2-6366e12ba739/web/IN-en-20260803-TRIFECTA-perspective_7730cca2-6324-4104-bf66-1a1f6e1a3e61_large.jpg"
					alt="background-img"
				/>
			</div> */}
			<div className="absolute inset-0 bg-black/50"></div>
			<div className="relative flex min-h-screen justify-center items-center">
				<BackendTest />
			</div>
		</div>
	)
}

export default LoginPage
