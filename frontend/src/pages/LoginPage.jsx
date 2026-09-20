// import Header from "../components/Header"
// import LoginForm from "../components/LoginForm"
// import { BG_URL } from "../utils/constants"

// const LoginPage = () => {
// 	return (
// 		<div>
// 			<Header />
// 			<div className="absolute inset-0 -z-10">
// 				<img
// 					className=" h-full w-full object-cover"
// 					src={BG_URL}
// 					alt="background-img"
// 				/>
// 			</div>
// 			<div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
// 				<LoginForm />
// 			</div>
// 		</div>
// 	)
// }

// export default LoginPage

import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
import { BG_URL } from "../utils/constants"

const LoginPage = () => {
	return (
		<main className="relative h-screen overflow-hidden bg-black">
			{/* Background Image */}
			<div className="absolute inset-0">
				<img
					className="h-full w-full object-cover opacity-70"
					src={BG_URL}
					alt="cinematic background"
				/>
			</div>

			{/* Cinematic Overlays */}
			<div className="absolute inset-0 bg-black/30" />

			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

			<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />

			{/* Header */}
			<Header />

			{/* Login Content */}
			<section className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-12 pt-24 sm:px-6">
				<div className="w-full max-w-md">
					{/* Glass Login Card */}
					<div className="rounded-2xl border border-white/15 bg-black/65 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
						<div className="mb-8 text-center">
							<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
								Welcome Back
							</h1>

							<p className="mt-3 text-sm text-gray-400">
								Sign in to continue watching your favorite movies.
							</p>
						</div>

						<LoginForm />

						<div className="mt-8 border-t border-white/10 pt-4 text-center">
							<p className="text-xs leading-relaxed text-gray-500">
								Your cinematic experience starts here.
							</p>
							<p className="text-xs leading-relaxed text-gray-500">
								Powered by{" "}
								<span className="font-semibold text-gray-400">
									Google Gemini
								</span>
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default LoginPage
