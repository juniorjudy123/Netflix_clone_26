import React from "react"
import { useSelector } from "react-redux"
import MovieList from "./MovieList"

function GeminiMovieSuggestions() {
	const gemini = useSelector((store) => store.gemini)
	const { geminiSearch, geminiMovieResults } = gemini

	if (!geminiSearch) return null

	return (
		<div className="p-4 m-4 bg-black text-white opacity-90">
			<div>
				{geminiSearch.map((movieName, index) => (
					<MovieList
						key={movieName}
						title={movieName}
						movies={geminiMovieResults[index]}
					/>
				))}
			</div>
		</div>
	)
}

export default GeminiMovieSuggestions
