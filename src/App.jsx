import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Browse from "./components/Browse"
import LoginPage from "./pages/LoginPage"

function App() {
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

	return <RouterProvider router={appRouter} />
}

export default App
