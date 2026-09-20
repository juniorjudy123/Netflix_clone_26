import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Shimmer from "./schimmer"

function PublicRoute({ children }) {
	const user = useSelector((store) => store.user.user)
	const isAuthLoading = useSelector((store) => store.user.isAuthLoading)

	if (isAuthLoading) {
		return <Shimmer />
	}

	if (user) {
		return <Navigate to="/browse" replace />
	}

	return children
}

export default PublicRoute
