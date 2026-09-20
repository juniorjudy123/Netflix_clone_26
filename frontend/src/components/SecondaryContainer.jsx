import { useSelector } from "react-redux"
import MovieList from "./MovieList"

function SecondaryContainer() {
	const movies = useSelector((store) => store.movies)

	const hasMovies =
		movies?.nowPlayingMovies?.length ||
		movies?.topRatedMovies?.length ||
		movies?.upComingMovies?.length ||
		movies?.popularMovies?.length

	if (!hasMovies) return null

	return (
		<section className="relative z-20 -mt-20 bg-gradient-to-b from-transparent via-black/90 to-black pt-6 md:-mt-52 md:pt-10">
			<div className="space-y-5 px-6 pb-8 sm:px-8 md:px-10 lg:px-16">
				s
				{movies?.nowPlayingMovies?.length > 0 && (
					<MovieList movies={movies.nowPlayingMovies} title="Now Playing" />
				)}
				{movies?.topRatedMovies?.length > 0 && (
					<MovieList movies={movies.topRatedMovies} title="Top Rated" />
				)}
				{movies?.upComingMovies?.length > 0 && (
					<MovieList movies={movies.upComingMovies} title="Upcoming" />
				)}
				{movies?.popularMovies?.length > 0 && (
					<MovieList movies={movies.popularMovies} title="Popular" />
				)}
			</div>
		</section>
	)
}

export default SecondaryContainer
