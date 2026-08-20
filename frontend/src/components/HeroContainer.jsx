import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const HeroContainer = ({ title, overview, movieId }) => {
	return (
		<div className="pt-36">
			<VideoBackground movieId={movieId} />
			<VideoTitle title={title} overview={overview} />
		</div>
	)
}

export default HeroContainer
