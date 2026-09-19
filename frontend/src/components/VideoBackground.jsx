// import { useSelector } from "react-redux"
// import useTrailerVideos from "../hooks/useTrailerVideos"

// function VideoBackground({ movieId }) {
// 	const trailerVideo = useSelector((store) => store.movies?.trailerVideo)

// 	useTrailerVideos(movieId)

// 	if (!trailerVideo) return null

// 	return (
// 		<div className="w-screen absolute top-0 left-0 aspect-video overflow-hidden  pt-10 md:pt-0 ">
// 			<iframe
// 				className="w-screen aspect-video"
// 				src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0`}
// 				title="YouTube video player"
// 				allow="autoplay; encrypted-media"
// 				referrerPolicy="strict-origin-when-cross-origin"
// 			/>
// 		</div>
// 	)
// }

// export default VideoBackground

import { useSelector } from "react-redux"
import useTrailerVideos from "../hooks/useTrailerVideos"

function VideoBackground({ movieId }) {
	const trailerVideo = useSelector((store) => store.movies?.trailerVideo)

	useTrailerVideos(movieId)

	if (!trailerVideo) return null

	return (
		<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
			<iframe
				className="absolute left-1/2 top-1/2 h-[120%] w-[180%] -translate-x-1/2 -translate-y-1/2 scale-110 md:h-[140%] md:w-[140%]"
				src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&rel=0`}
				title="Movie trailer"
				allow="autoplay; encrypted-media"
				referrerPolicy="strict-origin-when-cross-origin"
			/>

			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black/10" />

			{/* Left Gradient */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

			{/* Bottom Gradient */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
		</div>
	)
}

export default VideoBackground
