import MovieCard from "./MovieCard"

const MovieList = ({ movies, title }) => {
	console.log("MOVIES RECEIVED BY MOVIELIST:", movies)
	return (
		movies && (
			<div className="p-4 ">
				<h1 className="text-2xl md:text-2xl font-bold py-3 text-white">
					{title}
				</h1>
				<div className="p-2 flex overflow-x-scroll scrollbar-none gap-4">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</div>
		)
	)
}

export default MovieList
