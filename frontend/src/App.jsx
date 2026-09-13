import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import BrowsePage from "./pages/BrowsePage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
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
	])

	return <RouterProvider router={appRouter} />
}

export default App
