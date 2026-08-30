import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addUser, removeUser } from "../redux/userSlice"
import { LOGO } from "../utils/constants"
import { toggleGeminiSearchView } from "../redux/geminiSlice"

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((store) => store.user)

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

	return (
		<div className="relative w-screen px-12 py-6 bg-linear-to-b from-black z-10  flex justify-between  ">
			<img className="w-40" src={LOGO} alt="netflix-logo" />
			{user && (
				<div className=" flex gap-8">
					<button
						className="text-white px-2 bg-purple-600 rounded-lg cursor-pointer "
						onClick={handleGeminiSearchClick}
					>
						GeminiSearch
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
