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
		<header className="absolute left-0 top-0 z-50 w-full bg-gradient-to-b from-black/80 via-black/30 to-transparent px-3 py-2 sm:px-6 md:px-10 lg:px-12">
			<div className="mx-auto flex max-w-[1600px] flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<header className="flex items-center px-6 py-4">
					<div className="flex items-center px-2 py-1">
						<img
							src="/favicon.png"
							alt="NetflixGPT Logo"
							className="h-12 w-12 object-contain sm:h-16 sm:w-16"
						/>
					</div>
				</header>
				{user && (
					<div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3 md:justify-end">
						{/* Watchlist */}
						<button
							onClick={() => navigate("/watchlist")}
							// className="rounded-md border border-white/20 bg-black/30 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-4 sm:text-sm"
							className="flex h-9 items-center shadow-lg text-white border-white/20 bg-black/30  hover:bg-white/15 justify-center rounded-md px-3 text-xs font-semibold whitespace-nowrap transition sm:h-10 sm:px-4 sm:text-sm"
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
							// className="rounded-md bg-purple-600 px-2 py-1 text-xs font-semibold text-white shadow-lg transition hover:bg-purple-700 sm:px-4 sm:text-sm"
							className="flex h-9 items-center bg-purple-600 text-white shadow-lg hover:bg-purple-700 justify-center rounded-md px-3 text-xs font-semibold whitespace-nowrap transition sm:h-10 sm:px-4 sm:text-sm"
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
							// className="rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 sm:px-4 sm:text-sm"
							className="flex h-9 items-center text-white shadow-lg bg-red-600 hover:bg-red-700 justify-center rounded-md px-3 text-xs font-semibold whitespace-nowrap transition sm:h-10 sm:px-4 sm:text-sm"
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
