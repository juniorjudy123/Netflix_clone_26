import Header from "../components/Header"
import MainContainer from "../components/MainContainer"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies"
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import useUpcomingMovies from "../hooks/useUpComingMovies"

const BrowsePage = () => {
	useNowPlayingMovies()
	usePopularMovies()
	useUpcomingMovies()
	useTopRatedMovies()


	return (
		<div>
			<Header />
			<MainContainer />
		</div>
	)
}

export default BrowsePage
