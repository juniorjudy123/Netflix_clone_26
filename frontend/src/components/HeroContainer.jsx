import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const HeroContainer = ({ title, overview, movieId }) => {
	return (
		<section className="relative h-[70vh] min-h-[520px] overflow-hidden bg-black md:h-[85vh]">
			{/* Video Background */}
			<VideoBackground movieId={movieId} />

			{/* Title Content */}
			<div className="absolute inset-0 z-10 flex items-end pb-4 pt-24 md:pb-24">
				<VideoTitle title={title} overview={overview} />
			</div>
		</section>
	)
}

export default HeroContainer
