// import HeroContainer from "./HeroContainer"
// import { useSelector } from "react-redux"
// import SecondaryContainer from "./SecondaryContainer"

// const MainContainer = () => {
// 	const movies = useSelector((store) => store.movies?.nowPlayingMovies)

// 	if (!movies) return null

// 	const mainMovie = movies[5]

// 	const { original_title, overview, id } = mainMovie

// 	return (
// 		<div>
// 			<HeroContainer title={original_title} overview={overview} movieId={id} />
// 			<SecondaryContainer />
// 		</div>
// 	)
// }

// export default MainContainer

import HeroContainer from "./HeroContainer"
import { useSelector } from "react-redux"
import SecondaryContainer from "./SecondaryContainer"
import { useMemo } from "react"

const MainContainer = () => {
	const movies = useSelector((store) => store.movies?.nowPlayingMovies)

	const mainMovie = useMemo(() => {
		if (!movies?.length) return null

		const randomIndex = Math.floor(Math.random() * movies.length)

		return movies[randomIndex]
	}, [movies])

	if (!mainMovie) return null

	const { original_title, overview, id } = mainMovie

	return (
		<div>
			<HeroContainer title={original_title} overview={overview} movieId={id} />

			<SecondaryContainer />
		</div>
	)
}

export default MainContainer
