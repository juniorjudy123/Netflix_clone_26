import HeroContainer from "./HeroContainer"
import { useSelector } from "react-redux"
import SecondaryContainer from "./SecondaryContainer"

const MainContainer = () => {
	const movies = useSelector((store) => store.movies?.nowPlayingMovies)

	if (!movies) return null

	const mainMovie = movies[1]

	const { original_title, overview, id } = mainMovie

	return (
		<div>
			<HeroContainer title={original_title} overview={overview} movieId={id} />
			<SecondaryContainer />
		</div>
	)
}

export default MainContainer
