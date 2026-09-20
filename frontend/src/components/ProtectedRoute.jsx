import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
	const user = useSelector((store) => store.user.user)
	

	const isAuthLoading = useSelector((store) => store.user.isAuthLoading)
	

	if (isAuthLoading) {
		return <div>Loading...</div>
	}

	if (!user) {
		return <Navigate to="/" replace />
	}
	return children
}

export default ProtectedRoute
