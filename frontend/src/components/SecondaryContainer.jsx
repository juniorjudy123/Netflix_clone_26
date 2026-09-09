import { useSelector } from "react-redux"
import MovieList from "./MovieList"

function SecondaryContainer() {
	const movies = useSelector((store) => store.movies)

	if (!movies?.nowPlayingMovies?.length) return null
	if (!movies?.topRatedMovies?.length) return null
	if (!movies?.upComingMovies?.length) return null
	if (!movies?.popularMovies?.length) return null

	return (
		<div className=" bg-black">
			<div className="relative z-20  md:mt-[-40%] pt-12 pl-6">
				<MovieList movies={movies?.nowPlayingMovies} title="Now Playing" />
				<MovieList movies={movies?.topRatedMovies} title="Top Rated" />
				<MovieList movies={movies?.upComingMovies} title="Up Coming" />
				<MovieList movies={movies?.popularMovies} title="Popular" />
			</div>
		</div>
	)
}

export default SecondaryContainer

// import { useSelector } from "react-redux"
// import MovieList from "./MovieList"

// function SecondaryContainer() {
// 	const movies = useSelector((store) => store.movies)

// 	console.log("SECONDARY:", movies)

// 	if (!movies?.nowPlayingMovies?.length) return null

// 	return (
// 		<div className="relative z-50 bg-black min-h-screen pt-20">
// 			<h1 className="text-white text-4xl">SECONDARY CONTAINER</h1>
// 			{/* <MovieList movies={movies} /> */}
// 			<MovieList movies={movies?.nowPlayingMovies} title="Now Playing" />
// 			<MovieList movies={movies?.nowPlayingMovies} title="Now Playing" />
// 			<MovieList movies={movies?.nowPlayingMovies} title="Now Playing" />
// 			<MovieList movies={movies?.nowPlayingMovies} title="Now Playing" />
// 			<MovieList movies={movies?.nowPlayingMovies} title="Now Playing" />
// 		</div>
// 	)
// }

// export default SecondaryContainer
