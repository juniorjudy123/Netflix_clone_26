import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import BrowsePage from "./pages/BrowsePage"

function App() {
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <LoginPage />,
		},
		{
			path: "/browse",
			element: <BrowsePage />,
		},
	])

	return <RouterProvider router={appRouter} />
}

export default App
