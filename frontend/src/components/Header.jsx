import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addUser, removeUser } from "../redux/userSlice"
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants"
import { toggleGeminiSearchView } from "../redux/geminiSlice"
import { changeLang } from "../redux/configSlice"

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((store) => store.user)
	const GeminiSearch = useSelector((store) => store.gemini.showGeminiSearch)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user
				dispatch(
					addUser({
						uid: uid,
						email: email,
						displayName: displayName,
						photoURL: photoURL,
					}),
				)
				navigate("/browse")
			} else {
				dispatch(removeUser())
				navigate("/")
			}
		})
		// unsubscribe when component unmounts
		return () => unsubscribe()
	}, [])

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {})
			.catch((error) => {
				navigate("/error")
			})
	}

	const handleGeminiSearchClick = () => {
		dispatch(toggleGeminiSearchView())
	}
	const handleLangChange = (e) => {
		dispatch(changeLang(e.target.value))
	}

	return (
		<div className="relative w-screen px-12 py-8 bg-linear-to-b from-black z-10  flex flex-col md:flex-row justify-between  ">
			<img className="w-40 mx-auto md:mx-0" src={LOGO} alt="netflix-logo" />
			{user && (
				<div className=" flex gap-8 py-8 md:py-0">
					{GeminiSearch && (
						<select
							className="text-white bg-gray-900 opacity-80 rounded-lg p-2"
							onClick={handleLangChange}
						>
							{SUPPORTED_LANGUAGES.map((lang) => (
								<option key={lang.identifier} value={lang.identifier}>
									{lang.name}
								</option>
							))}
						</select>
					)}
					<button
						className="text-white px-2 bg-purple-600 rounded-lg cursor-pointer "
						onClick={handleGeminiSearchClick}
					>
						{GeminiSearch ? "< Back" : "GeminiSearch"}
					</button>
					<img
						alt="user-icon"
						className="w-12 h-12 rounded-2xl p-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
						src={user?.photoURL}
					/>

					<button
						className="font-bold bg-red-600 rounded-lg px-2 text-white cursor-pointer"
						onClick={handleSignOut}
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	)
}

export default Header
