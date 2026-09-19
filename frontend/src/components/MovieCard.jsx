import { IMG_CDN_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import axiosInstance from "../utils/axios"
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [isAdding, setIsAdding] = useState(false)
	const [isAdded, setIsAdded] = useState(false)
	const [isRemoving, setIsRemoving] = useState(false)

	if (!movie?.poster_path) return null

	const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"

	const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : ""

	const handleMovieClick = () => {
		navigate(`/movie/${movie.id}`)
	}

	const handleAddToWatchlist = async (event) => {
		event.stopPropagation()

		if (isAdding || isAdded) return

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

	const handleRemoveFromWatchlist = async (event) => {
		event.stopPropagation()

		if (isRemoving) return

		setIsRemoving(true)

		try {
			await axiosInstance.delete(`watchlist/${movie.watchlistId}/`)

			dispatch(removeFromWatchlist(movie.watchlistId))

			console.log("REMOVED FROM WATCHLIST")
		} catch (error) {
			console.log("REMOVE WATCHLIST ERROR:", error)
		} finally {
			setIsRemoving(false)
		}
	}

	return (
		<div
			onClick={handleMovieClick}
			className="group relative w-36 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-2xl md:w-48"
		>
			{/* Movie Poster */}
			<div className="relative aspect-[2/3] overflow-hidden">
				<img
					src={IMG_CDN_URL + movie.poster_path}
					alt={movie.title || "Movie poster"}
					loading="lazy"
					className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
				/>

				{/* Dark Gradient */}
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

				{/* Top Rating */}
				<div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur-sm">
					★ {rating}
				</div>

				{/* Watchlist Button */}
				{/* Watchlist Action */}
				<div className="absolute right-2 top-2">
					{movie?.watchlistId ? (
						<button
							onClick={handleRemoveFromWatchlist}
							disabled={isRemoving}
							aria-label="Remove from watchlist"
							className="rounded-full bg-black/80 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-red-600 disabled:opacity-50"
						>
							{isRemoving ? "Removing..." : "✓ Saved"}
						</button>
					) : (
						<button
							onClick={handleAddToWatchlist}
							disabled={isAdding || isAdded}
							aria-label="Add to watchlist"
							className={`flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-white shadow-lg transition ${
								isAdded ? "bg-green-600" : "bg-black/80 hover:bg-red-600"
							}`}
						>
							{isAdding ? "..." : isAdded ? "✓" : "+"}
						</button>
					)}
				</div>

				{/* Hover Details Button */}
				<div className="absolute inset-x-0 bottom-20 flex justify-center opacity-0 transition duration-300 group-hover:opacity-100">
					<button
						onClick={(event) => {
							event.stopPropagation()
							handleMovieClick()
						}}
						className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black shadow-xl transition hover:bg-gray-200"
					>
						<span>▶</span>
						Details
					</button>
				</div>

				{/* Movie Information */}
				<div className="absolute bottom-0 left-0 right-0 p-3">
					<h3
						className="truncate text-sm font-bold text-white md:text-base"
						title={movie.title}
					>
						{movie.title}
					</h3>

					{releaseYear && (
						<p className="mt-1 text-xs text-gray-300">{releaseYear}</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default MovieCard
