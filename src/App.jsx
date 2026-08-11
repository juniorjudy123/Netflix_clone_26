import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom"
import Browse from "./components/Browse"
import LoginPage from "./pages/LoginPage"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./utils/firebase"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "./redux/userSlice"

function App() {
	const dispatch = useDispatch()

	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <LoginPage />,
		},
		{
			path: "/browse",
			element: <Browse />,
		},
	])

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
			} else {
				dispatch(removeUser())
			}
			return () => unsubscribe()
		})
	}, [])

	return <RouterProvider router={appRouter} />
}

export default App
