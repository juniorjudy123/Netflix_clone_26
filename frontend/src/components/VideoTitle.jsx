const VideoTitle = ({ title, overview }) => {
	return (
		<div className=" w-screen aspect-video  px-12  text-white relative bg-linear-to-r from-black">
			<h1 className="text-6xl font-bold ">{title}</h1>
			<p className="hidden md:block text-md max-w-lg py-6 leading-relaxed text-justify">
				{overview}
			</p>
			<div className="flex gap-4 py-6 ">
				<button className="text-black  bg-white p-2 px-10 rounded-lg  cursor-pointer  hover:opacity-80">
					▶️ Play
				</button>
				<button className="text-black  bg-white p-2 px-10 rounded-lg  cursor-pointer hover:opacity-80">
					❕More Info
				</button>
			</div>
		</div>
	)
}

export default VideoTitle
