import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_OPTIONS } from "../utils/constants"

const MovieDetailsPage = () => {
	const { movieId } = useParams()
	const navigate = useNavigate()

	const [movie, setMovie] = useState(null)
	const [trailerKey, setTrailerKey] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				setLoading(true)
				setError("")

				const movieResponse = await fetch(
					`https://api.themoviedb.org/3/movie/${movieId}`,
					API_OPTIONS,
				)

				if (!movieResponse.ok) {
					throw new Error("Failed to fetch movie")
				}

				const movieData = await movieResponse.json()

				const videosResponse = await fetch(
					`https://api.themoviedb.org/3/movie/${movieId}/videos`,
					API_OPTIONS,
				)

				if (!videosResponse.ok) {
					throw new Error("Failed to fetch videos")
				}

				const videosData = await videosResponse.json()

				const officialTrailer = videosData.results?.find(
					(video) =>
						video.site === "YouTube" &&
						video.type === "Trailer" &&
						video.official === true,
				)

				const fallbackTrailer = videosData.results?.find(
					(video) =>
						video.site === "YouTube" &&
						(video.type === "Trailer" || video.type === "Teaser"),
				)

				setMovie(movieData)
				setTrailerKey(officialTrailer?.key || fallbackTrailer?.key || null)
			} catch (error) {
				console.log("MOVIE DETAILS ERROR:", error)
				setError("Unable to load movie details.")
			} finally {
				setLoading(false)
			}
		}

		fetchMovieDetails()
	}, [movieId])

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-black text-white">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-red-600" />
			</div>
		)
	}

	if (error || !movie) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-black text-white">
				<p className="text-lg text-red-400">{error || "Movie not found"}</p>

				<button
					onClick={() => navigate(-1)}
					className="rounded-lg bg-red-600 px-5 py-2 font-semibold transition hover:bg-red-700"
				>
					Go Back
				</button>
			</div>
		)
	}

	const releaseYear = movie.release_date
		? movie.release_date.split("-")[0]
		: "N/A"

	const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0

	const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0

	const runtime = movie.runtime ? `${runtimeHours}h ${runtimeMinutes}m` : "N/A"

	const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"

	return (
		<main className="min-h-screen bg-[#080808] text-white">
			{/* Background Hero */}
			<section className="relative min-h-[850px] overflow-hidden md:min-h-screen">
				{/* Backdrop Image */}
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-[length:auto_60%] bg-center bg-no-repeat md:bg-cover"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
					}}
				/>

				{/* Lighter Background Overlays */}
				<div className="absolute inset-0 bg-black/20" />

				<div className="absolute inset-0 bg-gradient-to-r from-[#080808]/75 via-[#080808]/35 to-transparent" />

				<div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-[#080808]/20" />
				{/* Content */}
				<div className="relative z-10 px-5 py-6 sm:px-8 md:px-12 lg:px-20">
					{/* Header */}
					<div className="mb-12 flex items-center justify-between">
						<button
							onClick={() => navigate(-1)}
							className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
						>
							<span className="text-lg">←</span>
							Back
						</button>

						<span className="rounded-full border border-red-500/40 bg-red-600/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400">
							Movie Details
						</span>
					</div>

					{/* Main Layout */}
					<div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
						{/* LEFT: Movie Details */}
						<div className="max-w-2xl">
							{/* Movie Poster + Small Label */}
							<div className="mb-7 flex items-center gap-5">
								<img
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
											: "/placeholder.jpg"
									}
									alt={movie.title}
									className="h-28 w-20 rounded-lg object-cover shadow-2xl sm:h-36 sm:w-24"
								/>

								<div>
									<p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
										Now Exploring
									</p>

									<p className="text-sm text-gray-300">
										Movie information and trailer
									</p>
								</div>
							</div>

							{/* Title */}
							<h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
								{movie.title}
							</h1>

							{/* Tagline */}
							{movie.tagline && (
								<p className="mt-5 text-base italic text-gray-300 sm:text-lg">
									"{movie.tagline}"
								</p>
							)}

							{/* Metadata */}
							<div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
								<span className="rounded-md bg-yellow-500 px-2.5 py-1 font-bold text-black">
									★ {rating}
								</span>

								<span className="text-gray-200">{releaseYear}</span>

								<span className="text-gray-500">•</span>

								<span className="text-gray-200">{runtime}</span>

								<span className="text-gray-500">•</span>

								<span className="text-gray-200">{movie.status}</span>
							</div>

							{/* Genres */}
							{movie.genres?.length > 0 && (
								<div className="mt-6 flex flex-wrap gap-2">
									{movie.genres.map((genre) => (
										<span
											key={genre.id}
											className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-gray-200 backdrop-blur-sm"
										>
											{genre.name}
										</span>
									))}
								</div>
							)}

							{/* Overview */}
							<div className="mt-8">
								<h2 className="mb-3 text-xl font-bold">Storyline</h2>

								<p className="text-sm leading-7 text-gray-300 sm:text-base">
									{movie.overview || "No overview available for this movie."}
								</p>
							</div>

							{/* Additional Details */}
							<div className="mt-8 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 text-sm sm:grid-cols-2">
								<div>
									<p className="text-xs uppercase tracking-wider text-gray-500">
										Release Date
									</p>

									<p className="mt-1 text-gray-200">
										{movie.release_date || "N/A"}
									</p>
								</div>

								<div>
									<p className="text-xs uppercase tracking-wider text-gray-500">
										Language
									</p>

									<p className="mt-1 text-gray-200">
										{movie.original_language
											? movie.original_language.toUpperCase()
											: "N/A"}
									</p>
								</div>
							</div>
						</div>

						{/* RIGHT: Trailer Card */}
						<div className="w-full">
							<div className="overflow-hidden rounded-2xl border border-white/15 bg-black/45 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
								{/* Trailer Header */}
								<div className="mb-4 flex items-center justify-between px-1">
									<div>
										<p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
											Watch Preview
										</p>

										<h2 className="mt-1 text-xl font-bold">Official Trailer</h2>
									</div>

									<div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/20 text-red-500">
										▶
									</div>
								</div>

								{/* Trailer */}
								{trailerKey ? (
									<div className="aspect-video overflow-hidden rounded-xl bg-black">
										<iframe
											className="h-full w-full"
											src={`https://www.youtube.com/embed/${trailerKey}`}
											title={`${movie.title} Official Trailer`}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										/>
									</div>
								) : (
									<div className="flex aspect-video items-center justify-center rounded-xl bg-white/5 px-5 text-center text-sm text-gray-400">
										Official trailer is not available.
									</div>
								)}

								{/* Trailer Footer */}
								<div className="mt-4 flex items-center justify-between px-1">
									<p className="text-xs text-gray-400">Watch on YouTube</p>

									<span className="text-xs font-semibold text-red-400">
										Netflix GPT
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Spacing */}
					<div className="h-20 lg:h-32" />
				</div>
			</section>
		</main>
	)
}

export default MovieDetailsPage
