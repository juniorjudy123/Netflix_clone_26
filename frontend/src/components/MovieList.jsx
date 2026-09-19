import MovieCard from "./MovieCard"

const MovieList = ({ movies, title }) => {
	console.log("MOVIES RECEIVED BY MOVIELIST:", movies)
	return (
		movies && (
			<div className="p-4 ">
				<h1 className="text-2xl md:text-2xl font-bold py-3 text-white">
					{title}
				</h1>
				<div className="flex gap-3 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</div>
		)
	)
}

export default MovieList
