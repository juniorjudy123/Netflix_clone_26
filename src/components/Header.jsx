import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
	const navigate = useNavigate()
	const user = useSelector((store) => store.user)

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				navigate("/")
			})
			.catch((error) => {
				navigate("/error")
			})
	}
	return (
		<div className="absolute w-screen px-12 py-6 bg-linear-to-b from-black z-10 flex justify-between ">
			<img
				className="w-40"
				src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAZge2REfWoSoWRs31izjUdgihldMUslSHTdfz-1aT4vVrgJuVByU92G8wIrBkwULJHWjM1khpzW0xWndigQFYViKFpy-pM6NZFnTKEPkpf9hcdSzCyzqBbcouyIpmgVLbodhaeyqCXaS.svg"
				alt="netflix-logo"
			/>
			{user && (
				<div className=" flex gap-6">
					<img
						alt="user-icon"
						className="w-12 h-12 rounded-2xl p-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
						src={user?.photoURL}
					/>

					<button
						className="font-bold text-white cursor-pointer"
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
