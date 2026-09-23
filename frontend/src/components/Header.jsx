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

	const buttonBase =
		"flex h-8 items-center justify-center rounded-md px-2 text-[11px] font-semibold whitespace-nowrap shadow-lg transition sm:h-9 sm:px-3 sm:text-xs md:h-10 md:px-4 md:text-sm"

	return (
		<header className="absolute left-0 top-0 z-50 w-full bg-gradient-to-b from-black/90 via-black/40 to-transparent px-3 py-2 sm:top-0 sm:px-6 sm:py-3 md:px-10 lg:px-12">
			<div className="mx-auto flex max-w-[1600px] items-center justify-between pt-3 gap-2">
				{/* Logo */}
				<button onClick={() => navigate("/browse")} className="shrink-0">
					<img
						src="/favicon.png"
						alt="NetflixGPT Logo"
						className="h-11 w-11 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
					/>
				</button>

				{/* Navigation Actions */}
				{user && (
					<div className="flex max-w-[85%] flex-wrap items-center justify-end gap-1 sm:gap-2 md:gap-3">
						{/* Watchlist */}
						<button
							onClick={() => navigate("/watchlist")}
							className={`${buttonBase} border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-white/15`}
						>
							Watchlist
						</button>

						{/* Language Selector */}
						{GeminiSearch && (
							<select
								className="h-8 max-w-[85px] rounded-md border border-white/20 bg-black/70 px-1 text-[11px] text-white outline-none backdrop-blur-sm sm:h-9 sm:max-w-none sm:px-2 sm:text-xs md:h-10 md:text-sm"
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

						{/* AI Search / Back */}
						<button
							onClick={handleGeminiSearchClick}
							className={`${buttonBase} bg-purple-600 text-white hover:bg-purple-700`}
						>
							{GeminiSearch ? "← Back" : "AI Search"}
						</button>

						{/* Avatar */}
						<div className="hidden h-9 w-9 overflow-hidden rounded-full border border-white/30 bg-gray-700 md:block">
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
							className={`${buttonBase} bg-red-600 text-white hover:bg-red-700`}
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
