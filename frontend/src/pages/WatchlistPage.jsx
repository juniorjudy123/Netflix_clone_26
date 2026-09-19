import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import axiosInstance from "../utils/axios"
import { setWatchlist } from "../redux/watchlistSlice"
import { API_OPTIONS } from "../utils/constants"
import MovieList from "../components/MovieList"

const WatchlistPage = () => {
	const dispatch = useDispatch()

	const [movies, setMovies] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isMovieLoading, setIsMovieLoading] = useState(false)
	const [error, setError] = useState("")

	const watchlistMovies = useSelector((store) => store.watchlist.movies)

	// Fetch watchlist from Django
	useEffect(() => {
		const fetchWatchlist = async () => {
			try {
				setIsLoading(true)
				setError("")

				const response = await axiosInstance.get("watchlist/")

				dispatch(setWatchlist(response.data))
			} catch (error) {
				console.log("WATCHLIST ERROR:", error)
				setError("We couldn't load your watchlist.")
			} finally {
				setIsLoading(false)
			}
		}

		fetchWatchlist()
	}, [dispatch])

	// Fetch movie details from TMDB
	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				setIsMovieLoading(true)
				setError("")

				const movieDetails = await Promise.all(
					watchlistMovies.map(async (watchlistMovie) => {
						const response = await fetch(
							`https://api.themoviedb.org/3/movie/${watchlistMovie.tmdb_movie_id}`,
							API_OPTIONS,
						)

						if (!response.ok) {
							throw new Error("Failed to fetch movie details")
						}

						const movieData = await response.json()

						return {
							...movieData,
							watchlistId: watchlistMovie.id,
						}
					}),
				)

				setMovies(movieDetails)
			} catch (error) {
				console.log("MOVIE DETAILS ERROR:", error)
				setError("We couldn't load the movie details.")
			} finally {
				setIsMovieLoading(false)
			}
		}

		if (watchlistMovies.length === 0) {
			setMovies([])
			return
		}

		fetchMovieDetails()
	}, [watchlistMovies])

	// Initial Loading State
	if (isLoading) {
		return (
			<main className="min-h-screen bg-[#080808] px-6 py-10 text-white md:px-12 lg:px-20">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 space-y-4">
						<div className="h-3 w-28 animate-pulse rounded bg-gray-800" />
						<div className="h-10 w-64 animate-pulse rounded bg-gray-800" />
						<div className="h-4 w-80 animate-pulse rounded bg-gray-900" />
					</div>

					<div className="flex gap-5 overflow-hidden">
						{[1, 2, 3, 4, 5].map((item) => (
							<div
								key={item}
								className="h-64 w-40 shrink-0 animate-pulse rounded-xl bg-gray-900 md:h-72 md:w-48"
							/>
						))}
					</div>
				</div>
			</main>
		)
	}

	return (
		<main className="min-h-screen bg-[#080808] text-white">
			{/* Background Decoration */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-red-950/20 via-[#080808]/30 to-transparent" />

			<div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 md:px-12 lg:px-16 lg:py-12">
				{/* Page Header */}
				<header className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
					<div>
						<div className="mb-4 flex items-center gap-2">
							<span className="h-1 w-8 rounded-full bg-red-600" />

							<span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
								Your Library
							</span>
						</div>

						<h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
							My Watchlist
						</h1>

						<p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
							Keep track of the movies you want to watch next.
						</p>
					</div>

					{/* Movie Count */}
					<div className="flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600/15 text-red-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.8"
								className="h-5 w-5"
							>
								<path d="M4 5h16v16H4z" />
								<path d="M8 3v4M16 3v4M4 10h16" />
							</svg>
						</div>

						<div>
							<p className="text-lg font-bold leading-5">
								{watchlistMovies.length}
							</p>

							<p className="mt-1 text-xs text-gray-400">
								Saved {watchlistMovies.length === 1 ? "movie" : "movies"}
							</p>
						</div>
					</div>
				</header>

				{/* Error State */}
				{error && (
					<div className="mb-8 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
						<span>!</span>
						{error}
					</div>
				)}

				{/* Empty State */}
				{watchlistMovies.length === 0 ? (
					<section className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center">
						<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.06]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.4"
								className="h-9 w-9 text-gray-400"
							>
								<path d="M4 5h16v16H4z" />
								<path d="M8 3v4M16 3v4M4 10h16" />
							</svg>
						</div>

						<h2 className="text-2xl font-bold">Your watchlist is waiting</h2>

						<p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
							Discover something worth watching. Add movies to your collection
							and find them here whenever you're ready.
						</p>
					</section>
				) : (
					<section>
						{/* Section Heading */}
						<div className="mb-5 flex items-center justify-between">
							<h2 className="text-xl font-bold sm:text-2xl">Saved Movies</h2>

							{isMovieLoading && (
								<span className="text-xs text-gray-500">Updating...</span>
							)}
						</div>

						{/* Movie Collection */}
						<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-5">
							<MovieList movies={movies} />
						</div>
					</section>
				)}
			</div>
		</main>
	)
}

export default WatchlistPage
