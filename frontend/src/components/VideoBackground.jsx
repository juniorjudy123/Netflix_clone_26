import { useSelector } from "react-redux"
import useTrailerVideos from "../hooks/useTrailerVideos"

function VideoBackground({ movieId }) {
	const trailerVideo = useSelector((store) => store.movies?.trailerVideo)

	useTrailerVideos(movieId)

	if (!trailerVideo) return null

	return (
		<div className="w-screen absolute top-0 left-0 aspect-video overflow-hidden  pt-10 md:pt-0 ">
			<iframe
				className="w-screen aspect-video"
				src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0`}
				title="YouTube video player"
				allow="autoplay; encrypted-media"
				referrerPolicy="strict-origin-when-cross-origin"
			/>
		</div>
	)
}

export default VideoBackground
