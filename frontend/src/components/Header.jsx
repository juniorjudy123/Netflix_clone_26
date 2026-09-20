// import { useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { removeUser } from "../redux/userSlice"
// import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants"
// import { toggleGeminiSearchView } from "../redux/geminiSlice"
// import { changeLang } from "../redux/configSlice"

// const Header = () => {
// 	const dispatch = useDispatch()
// 	const navigate = useNavigate()
// 	const user = useSelector((store) => store.user.user)
// 	const GeminiSearch = useSelector((store) => store.gemini.showGeminiSearch)

// 	const handleSignOut = () => {
// 		;(localStorage.removeItem("accessToken"),
// 			localStorage.removeItem("refreshToken"))
// 		dispatch(removeUser())
// 		navigate("/")
// 	}

// 	const handleGeminiSearchClick = () => {
// 		dispatch(toggleGeminiSearchView())
// 	}
// 	const handleLangChange = (e) => {
// 		dispatch(changeLang(e.target.value))
// 	}

// 	return (
// 		// <div className="relative w-screen px-12 py-8 bg-linear-to-b from-black z-10  flex flex-col md:flex-row justify-between  ">
// 		<div className="absolute left-0 top-0 z-50 flex w-full flex-col justify-between bg-gradient-to-b from-black/70 via-black/20 to-transparent px-6 py-6 md:flex-row md:px-12 md:py-8">
// 			<img className="w-40 mx-auto md:mx-0" src={LOGO} alt="netflix-logo" />
// 			{user && (
// 				<div className=" flex gap-8 py-8 md:py-0">
// 					<button
// 						className="font-bold bg-gray-700 rounded-lg px-2 text-white cursor-pointer"
// 						onClick={() => navigate("/watchlist")}
// 					>
// 						My Watchlist
// 					</button>
// 					{GeminiSearch && (
// 						<select
// 							className="text-white bg-gray-900 opacity-80 rounded-lg p-2"
// 							onChange={handleLangChange}
// 						>
// 							{SUPPORTED_LANGUAGES.map((lang) => (
// 								<option key={lang.identifier} value={lang.identifier}>
// 									{lang.name}
// 								</option>
// 							))}
// 						</select>
// 					)}
// 					<button
// 						className="text-white px-2 bg-purple-600 rounded-lg cursor-pointer "
// 						onClick={handleGeminiSearchClick}
// 					>
// 						{GeminiSearch ? "< Back" : "AI Search"}
// 					</button>
// 					<img
// 						alt="user-icon"
// 						className="w-12 h-12 rounded-2xl p-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
// 						src={user?.photoURL}
// 					/>

// 					<button
// 						className="font-bold bg-red-600 rounded-lg px-2 text-white cursor-pointer"
// 						onClick={handleSignOut}
// 					>
// 						Sign Out
// 					</button>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default Header

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { removeUser } from "../redux/userSlice"
import { SUPPORTED_LANGUAGES } from "../utils/constants"
import { toggleGeminiSearchView } from "../redux/geminiSlice"
import { changeLang } from "../redux/configSlice"

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = useSelector((store) => store.user.user)

	const GeminiSearch = useSelector((store) => store.gemini.showGeminiSearch)

	const handleSignOut = () => {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("refreshToken")

		dispatch(removeUser())
		navigate("/")
	}

	const handleGeminiSearchClick = () => {
		if (GeminiSearch) {
			navigate("/browse")
		} else {
			navigate("/gpt-search")
		}
		dispatch(toggleGeminiSearchView())
	}

	const handleLangChange = (e) => {
		dispatch(changeLang(e.target.value))
	}

	return (
		<header className="absolute left-0 top-0 z-50 w-full bg-gradient-to-b from-black/80 via-black/30 to-transparent px-4 py-5 sm:px-6 md:px-10 lg:px-14">
			<div className="mx-auto flex max-w-[1600px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
				{/* Logo */}
				{/* <button
					onClick={() => navigate("/browse")}
					className="mx-auto cursor-pointer md:mx-0"
				>
					<img className="w-32 sm:w-36 md:w-40" src={LOGO} alt="Netflix logo" />
				</button> */}
				<button
					onClick={() => navigate("/browse")}
					className="group mx-auto cursor-pointer md:mx-0"
				>
					<span
						className="relative inline-block text-3xl font-bold tracking-tighter text-white
        [text-shadow:2px_2px_0px_#555,4px_4px_0px_#222]
        transition-transform duration-300 group-hover:scale-105
        sm:text-4xl"
					>
						NETFLIX
						<span
							className="relative -top-2 ml-0.5 text-[0.85em] font-semibold text-red-600
            [text-shadow:2px_2px_0px_#7f0000,3px_3px_0px_#350000]"
						>
							GPT
						</span>
					</span>
				</button>
				{user && (
					<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-end">
						{/* Watchlist */}
						<button
							onClick={() => navigate("/watchlist")}
							className="rounded-md border border-white/20 bg-black/30 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-4 sm:text-sm"
						>
							My Watchlist
						</button>

						{/* Language Selector */}
						{GeminiSearch && (
							<select
								className="rounded-md border border-white/20 bg-black/70 px-2 py-2 text-xs text-white outline-none backdrop-blur-sm sm:text-sm"
								onChange={handleLangChange}
								defaultValue="en"
							>
								{SUPPORTED_LANGUAGES.map((lang) => (
									<option key={lang.identifier} value={lang.identifier}>
										{lang.name}
									</option>
								))}
							</select>
						)}

						{/* AI Search */}
						<button
							onClick={handleGeminiSearchClick}
							className="rounded-md bg-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-purple-700 sm:px-4 sm:text-sm"
						>
							{GeminiSearch ? "← Back" : "AI Search"}
						</button>

						{/* User Avatar */}
						<div className="hidden h-9 w-9 overflow-hidden rounded-full border border-white/30 bg-gray-700 sm:block">
							{user?.photoURL ? (
								<img
									src={user.photoURL}
									alt="User profile"
									className="h-full w-full object-cover"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
									{user?.username?.charAt(0)?.toUpperCase() || "U"}
								</div>
							)}
						</div>

						{/* Sign Out */}
						<button
							onClick={handleSignOut}
							className="rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 sm:px-4 sm:text-sm"
						>
							Sign Out
						</button>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
