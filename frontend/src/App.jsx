import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import BrowsePage from "./pages/BrowsePage"
import ProtectedRoute from "./components/ProtectedRoute"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { addUser, removeUser } from "./redux/userSlice"
import axiosInstance from "./utils/axios"
import WatchlistPage from "./pages/WatchlistPage"
import MovieDetailsPage from "./components/MovieDetailsPage"
import GeminiSearchPage from "./pages/GeminiSearchPage"

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken")

		if (!accessToken) {
			dispatch(removeUser())
			return
		}
		const restoreUser = async () => {
			try {
				const response = await axiosInstance.get("profile/")

				dispatch(addUser(response.data))
			} catch (error) {
				console.log("Session restoration failed:", error)

				dispatch(removeUser())
			}
		}

		restoreUser()
	}, [dispatch])
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <LoginPage />,
		},
		{
			path: "/browse",
			element: (
				<ProtectedRoute>
					<BrowsePage />
				</ProtectedRoute>
			),
		},
		{
			path: "/watchlist",
			element: (
				<ProtectedRoute>
					<WatchlistPage />
				</ProtectedRoute>
			),
		},
		{
			path: "/movie/:movieId",
			element: <MovieDetailsPage />,
		},
		{
			path: "/gpt-search",
			element: <GeminiSearchPage />,
		},
	])

	return <RouterProvider router={appRouter} />
}

export default App
