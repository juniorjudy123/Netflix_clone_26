import { IMG_CDN_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import axiosInstance from "../utils/axios"
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice"
import { useState } from "react"

const MovieCard = ({ movie }) => {
	const dispatch = useDispatch()
	const [isAdding, setIsAdding] = useState(false)
	const [isAdded, setIsAdded] = useState(false)

	console.log("WATCHLIST ID:", movie?.watchlistId)

	if (!movie?.poster_path) return null

	const handleAddToWatchlist = async () => {
		setIsAdding(true)

		try {
			const response = await axiosInstance.post("watchlist/", {
				tmdb_movie_id: movie.id,
			})

			dispatch(addToWatchlist(response.data))
			setIsAdded(true)

			console.log("ADDED:", response.data)
		} catch (error) {
			console.log("WATCHLIST ERROR:", error)
		} finally {
			setIsAdding(false)
		}
	}
	const handleRemoveFromWatchlist = async () => {
		try {
			await axiosInstance.delete(`watchlist/${movie.watchlistId}/`)

			dispatch(removeFromWatchlist(movie.watchlistId))

			console.log("REMOVED FROM WATCHLIST")
		} catch (error) {
			console.log("REMOVE WATCHLIST ERROR:", error)
		}
	}
	return (
		<div className="relative w-36 md:w-48 shrink-0">
			<img
				className="w-full rounded"
				alt={movie?.title || "Movie Card"}
				src={IMG_CDN_URL + movie.poster_path}
			/>

			{movie?.watchlistId ? (
				<button
					onClick={handleRemoveFromWatchlist}
					className="absolute bottom-4 left-4 bg-gray-700 text-white px-3 py-2 rounded"
				>
					− Remove
				</button>
			) : (
				<button
					onClick={handleAddToWatchlist}
					disabled={isAdding || isAdded}
					className={`absolute bottom-62 right-2 text-white px-2 py-1 rounded ${
						isAdded ? "bg-green-600" : "bg-red-600"
					}`}
				>
					{isAdding ? "Adding..." : isAdded ? "✓" : "+"}
				</button>
			)}
		</div>
	)
}

export default MovieCard
