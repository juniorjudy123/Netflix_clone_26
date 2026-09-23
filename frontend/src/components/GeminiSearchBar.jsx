import { useRef, useState } from "react"
import { lang } from "../utils/languageConstants"
import { useDispatch, useSelector } from "react-redux"
import geminiAI from "../utils/geminiAi"
import { API_OPTIONS } from "../utils/constants"
import { addGeminiMovieResults } from "../redux/geminiSlice"

function GeminiSearchBar() {
	const dispatch = useDispatch()
	const langkey = useSelector((store) => store.config.lang)

	const searchText = useRef(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	const searchMovieTMDB = async (movie) => {
		const response = await fetch(
			"https://api.themoviedb.org/3/search/movie?query=" +
				encodeURIComponent(movie.trim()) +
				"&include_adult=false&language=en-US&page=1",
			API_OPTIONS,
		)

		if (!response.ok) {
			throw new Error("Failed to search movie")
		}

		const data = await response.json()
		return data.results
	}

	const handleAiSearch = async () => {
		const query = searchText.current.value.trim()

		if (!query || isLoading) return

		setIsLoading(true)

		try {
			const aiquery =
				"Act as a movie recommendation system. " +
				"Suggest exactly 5 movies for this query: " +
				query +
				". Return only movie names separated by commas. " +
				"Do not include numbering or explanations."

			const response = await geminiAI.models.generateContent({
				model: "gemini-3.6-flash",
				contents: aiquery,
			})

			const geminiMovies = response.text
				.split(",")
				.map((movie) => movie.trim())
				.filter(Boolean)
				.slice(0, 5)

			const tmdbResults = await Promise.all(
				geminiMovies.map((movie) => searchMovieTMDB(movie)),
			)

			dispatch(
				addGeminiMovieResults({
					movieNames: geminiMovies,
					movieResults: tmdbResults,
				}),
			)
		} catch (error) {
			console.error("AI search failed:", error)
			setError("Something went wrong. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="relative z-20 flex min-h-[320px] items-center justify-center rounded-lg bg-linear-to-b from-black via-gray-950 to-black px-4 pb-10  sm:min-h-[380px] sm:pb-14 sm:pt-42">
			<div className="w-full max-w-2xl">
				{/* Heading */}
				<div className="mb-6 text-center pt-6 sm:pt-0">
					<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
						<span>✦</span>
						AI MOVIE DISCOVERY
					</div>

					<h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
						Find your next favorite movie
					</h1>

					<p className="mt-2 text-sm text-gray-400 sm:text-base">
						Tell us what you feel like watching.
					</p>
				</div>

				{/* Search Form */}
				<form
					className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:rounded-full sm:p-2"
					onSubmit={(e) => {
						e.preventDefault()
						handleAiSearch()
					}}
				>
					<div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
						<span className="text-lg text-gray-400">⌕</span>

						<input
							ref={searchText}
							type="text"
							className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500 sm:text-base"
							placeholder={lang[langkey].placeholder}
							aria-label="Describe the movie you want to watch"
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 transition hover:from-purple-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-full"
					>
						{isLoading ? (
							<span className="flex items-center justify-center gap-2">
								<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
								Finding...
							</span>
						) : (
							lang[langkey].search
						)}
					</button>
				</form>

				{/* Suggestions */}
				<p className="mt-4 text-center text-xs text-gray-500">
					Try: "mind-bending sci-fi movies" or "feel-good comedy"
				</p>
			</div>
		</section>
	)
}

export default GeminiSearchBar
