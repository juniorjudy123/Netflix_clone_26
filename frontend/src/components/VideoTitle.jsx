const VideoTitle = ({ title, overview }) => {
	return (
		<div className="w-full max-w-2xl px-4 py-6 sm:px-8 sm:py-12 md:px-14 md:py-20 lg:px-16">
			{/* Featured Badge */}
			<div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
				<span className="rounded-sm bg-red-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white sm:text-xs">
					Featured
				</span>

				<span className="text-[11px] font-medium text-gray-300 sm:text-sm">
					NetflixGPT Original
				</span>
			</div>

			{/* Movie Title */}
			<h1 className="max-w-xl text-3xl font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
				{title}
			</h1>

			{/* Movie Metadata */}
			<div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-200 sm:mt-5 sm:gap-3 sm:text-sm">
				<span className="font-bold text-green-400">98% Match</span>

				<span>2026</span>

				<span className="rounded border border-gray-400 px-1.5 py-0.5 text-[10px]">
					HD
				</span>

				<span>Movie</span>
			</div>

			{/* Overview */}
			<p className="mt-3 line-clamp-3 max-w-xl text-xs leading-5 text-gray-200 drop-shadow-lg sm:mt-4 sm:text-base sm:leading-7 md:line-clamp-2">
				{overview}
			</p>

			{/* Action Buttons */}
			<div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
				<button className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-gray-200 sm:px-7 sm:py-3 sm:text-sm">
					<span className="text-base sm:text-lg">▶</span>
					Play
				</button>

				<button className="flex items-center gap-2 rounded-md bg-gray-500/70 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-gray-500 sm:px-7 sm:py-3 sm:text-sm">
					<span className="text-base sm:text-lg">ⓘ</span>
					More Info
				</button>
			</div>
		</div>
	)
}

export default VideoTitle
