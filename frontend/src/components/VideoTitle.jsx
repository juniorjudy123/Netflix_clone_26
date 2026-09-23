
const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-full max-w-xl px-4 pb-6 pt-4 sm:px-8 sm:pb-12 sm:pt-8 md:max-w-2xl md:px-14 md:pb-20 lg:px-16">
            {/* Featured Badge */}
            <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-4">
                <span className="rounded-sm bg-red-600 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-white sm:text-xs">
                    Featured
                </span>

                <span className="text-[10px] font-medium text-gray-300 sm:text-sm">
                    NetflixGPT Original
                </span>
            </div>

            {/* Movie Title */}
            <h1 className="max-w-lg text-2xl font-black leading-tight tracking-tight text-white drop-shadow-2xl sm:text-4xl md:text-6xl lg:text-7xl">
                {title}
            </h1>

            {/* Movie Metadata */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-medium text-gray-200 sm:mt-4 sm:gap-3 sm:text-sm">
                <span className="font-bold text-green-400">
                    98% Match
                </span>

                <span>2026</span>

                <span className="rounded border border-gray-400 px-1.5 py-0.5 text-[9px]">
                    HD
                </span>

                <span>Movie</span>
            </div>

            {/* Overview */}
            <p className="mt-2 line-clamp-2 max-w-lg text-[11px] leading-5 text-gray-200 drop-shadow-lg sm:mt-4 sm:text-sm sm:leading-6 md:text-base md:leading-7">
                {overview}
            </p>

            {/* Action Buttons - Visual Only */}
            <div className="mt-3 flex items-center gap-2 sm:mt-6 sm:gap-3">
                <button
                    className="flex h-8 items-center gap-1.5 rounded-md bg-white px-3 text-[11px] font-bold text-black transition hover:bg-gray-200 sm:h-11 sm:gap-2 sm:px-6 sm:text-sm"
                >
                    <span className="text-sm sm:text-lg">▶</span>
                    Play
                </button>

                <button
                    className="flex h-8 items-center gap-1.5 rounded-md bg-gray-500/70 px-3 text-[11px] font-bold text-white backdrop-blur-sm transition hover:bg-gray-500 sm:h-11 sm:gap-2 sm:px-6 sm:text-sm"
                >
                    <span className="text-sm sm:text-lg">ⓘ</span>
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle