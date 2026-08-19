import HeroContainer from "./HeroContainer"
import MovieList from "./MovieList"
import { useSelector } from "react-redux"

const MainContainer = () => {
	const movies = useSelector((store) => store.movies?.nowPlayingMovies)

	if (!movies) return null

	const mainMovie = movies[1]
	console.log("mainmovie", mainMovie)

	const { original_title, overview, poster_path, id } = mainMovie

	return (
		<div>
			<HeroContainer title={original_title} overview={overview} movieId={id} />
			<MovieList movies={movies?.nowPlayingMovies} />
		</div>
	)
}

export default MainContainer
