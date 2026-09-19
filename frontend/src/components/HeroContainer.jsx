import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

// const HeroContainer = ({ title, overview, movieId }) => {
// 	return (
// 		<div className="  md:pt-36 ">
// 			<VideoBackground movieId={movieId} />
// 			<VideoTitle title={title} overview={overview} />
// 		</div>
// 	)
// }

// export default HeroContainer

const HeroContainer = ({ title, overview, movieId }) => {
	return (
		<section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-black md:h-[90vh]">
			<VideoBackground movieId={movieId} />

			<div className="relative z-10 flex h-full items-end pb-56 pt-40 md:pb-36 md:pt-48">
				<VideoTitle title={title} overview={overview} />
			</div>
		</section>
	)
}

export default HeroContainer
