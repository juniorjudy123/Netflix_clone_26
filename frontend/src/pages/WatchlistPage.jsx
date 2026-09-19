import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "../utils/axios"
import { setWatchlist } from "../redux/watchlistSlice"
import { API_OPTIONS } from "../utils/constants"
import { useState } from "react"
import MovieList from "../components/MovieList"

const WatchlistPage = () => {
	const dispatch = useDispatch()
	const [movies, setMovies] = useState([])

	const watchlistMovies = useSelector((store) => store.watchlist.movies)

	useEffect(() => {
		const fetchWatchlist = async () => {
			try {
				const response = await axiosInstance.get("watchlist/")

				dispatch(setWatchlist(response.data))

				console.log("WATCHLIST PAGE:", response.data)
			} catch (error) {
				console.log("WATCHLIST ERROR:", error)
			}
		}

		fetchWatchlist()
	}, [dispatch])

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const movieDetails = await Promise.all(
					watchlistMovies.map(async (movie) => {
						const response = await fetch(
							`https://api.themoviedb.org/3/movie/${movie.tmdb_movie_id}`,
							API_OPTIONS,
						)
						const movieData = await response.json()

						return {
							...movieData,
							watchlistId: movie.id,
						}
					}),
				)

				setMovies(movieDetails)
			} catch (error) {
				console.log("MOVIE DETAILS ERROR:", error)
			}
		}

		if (watchlistMovies.length > 0) {
			fetchMovieDetails()
		}
	}, [watchlistMovies])

	console.log("MOVIES SENT TO MOVIELIST:", movies)

	// Keep your existing JSX here
	return (
		<div className="min-h-screen bg-black text-white p-8">
			<h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

			{watchlistMovies.length === 0 ? (
				<p>Your watchlist is empty.</p>
			) : (
				<div className="flex gap-4 flex-wrap">
					<MovieList movies={movies} />
				</div>
			)}
		</div>
	)
}

export default WatchlistPage
