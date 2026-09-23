import { useNavigate } from "react-router-dom"

const Footer = () => {
	const navigate = useNavigate()

	return (
		<footer className="border-t border-white/10 bg-[#080808] px-4 py-6 text-gray-400 sm:px-6 md:px-10 lg:px-12">
			<div className="mx-auto max-w-[1600px]">
				{/* Footer Top */}
				<div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
					{/* Brand */}
					<div className="max-w-sm">
						<h2 className="text-lg font-bold tracking-wide text-white">
							PRIME<span className="text-red-600">Time</span>
						</h2>

						<p className="mt-2 text-xs leading-5 text-gray-500">
							Discover movies, explore new stories, and find your next favorite
							film with AI-powered search.
						</p>
					</div>

					{/* Navigation */}
					<div>
						<h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white">
							Explore
						</h3>

						<div className="flex flex-col gap-1.5 text-xs">
							<button
								onClick={() => navigate("/browse")}
								className="text-left transition hover:text-white"
							>
								Browse Movies
							</button>

							<button
								onClick={() => navigate("/watchlist")}
								className="text-left transition hover:text-white"
							>
								My Watchlist
							</button>
						</div>
					</div>

					{/* Technology */}
					<div>
						<h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white">
							Built With
						</h3>

						<div className="flex flex-col gap-1.5 text-xs">
							<span>React</span>
							<span>Django REST Framework</span>
							<span>TMDB API</span>
							<span>Gemini AI</span>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="my-5 h-px bg-white/10" />

				{/* Footer Bottom */}
				<div className="flex flex-col gap-2 text-[10px] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
					<p>© {new Date().getFullYear()} PrimeTime. Built for learning.</p>
					<p>Movie data provided by TMDB.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
