import React from "react"
import MovieCard from "./MovieCard"

const MovieList = ({ movies, title }) => {
	return (
		movies && (
			<div className="p-4 ">
				<h1 className="text-3xl font-bold py-3 text-white">{title}</h1>
				<div className="p-2 flex overflow-x-scroll scrollbar-none gap-4">
					{movies.map((movie) => (
						<MovieCard key={movie.id} posterPath={movie.poster_path} />
					))}
				</div>
			</div>
		)
	)
}

export default MovieList
