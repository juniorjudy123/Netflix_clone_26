import { useRef } from "react"
import { lang } from "../utils/languageConstants"
import { useDispatch, useSelector } from "react-redux"
import geminiAI from "../utils/geminiAi"
import { API_OPTIONS } from "../utils/constants"
import { addGeminiMovieResults } from "../redux/geminiSlice"

function GeminiSearchBar() {
	const dispatch = useDispatch()
	const langkey = useSelector((Store) => Store.config.lang)
	const searchText = useRef(null)

	const searchMovieTMDB = async (movie) => {
		const response = await fetch(
			"https://api.themoviedb.org/3/search/movie?query=" +
				movie +
				"&include_adult=false&language=en-US&page=1",
			API_OPTIONS,
		)

		const data = await response.json()

		return data.results
	}

	const handleAiSearch = async () => {
		const aiquery =
			"Act as a movie recommendation system and suggest some movies for the query" +
			searchText.current.value +
			"Also give only 5 movie name suggestion,comma seperated"

		const response = await geminiAI.models.generateContent({
			model: "gemini-3.6-flash",
			contents: aiquery,
		})
		const geminiMovies = response.text.split(",")
		console.log(geminiMovies)

		const tmdbResults = await Promise.all(
			geminiMovies.map((movie) => searchMovieTMDB(movie)),
		)

		console.log(tmdbResults)
		dispatch(
			addGeminiMovieResults({
				movieNames: geminiMovies,
				movieResults: tmdbResults,
			}),
		)
	}

	return (
		<div className=" p-0 md:pt-[3%] flex justify-center">
			<form
				className="w-[95%]  md
				:w-1/2 bg-black grid grid-cols-12"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					ref={searchText}
					type="text"
					className="p-4 m-3 bg-white col-span-9"
					placeholder={lang[langkey].placeholder}
				></input>
				<button
					className=" bg-red-700 text-white
                rounded-lg  col-span-3 m-3"
					onClick={handleAiSearch}
				>
					{lang[langkey].search}
				</button>
			</form>
		</div>
	)
}

export default GeminiSearchBar
