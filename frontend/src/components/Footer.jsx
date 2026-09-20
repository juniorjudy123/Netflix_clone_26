import { useNavigate } from "react-router-dom"

const Footer = () => {
	const navigate = useNavigate()

	return (
		<footer className="border-t border-white/10 bg-[#080808] px-6 py-12 text-gray-400 md:px-12 lg:px-16">
			<div className="mx-auto max-w-[1600px]">
				{/* Footer Top */}
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					{/* Brand */}
					<div className="max-w-sm">
						<h2 className="text-xl font-bold tracking-wide text-white">
							NETFLIX<span className="text-red-600">GPT</span>
						</h2>

						<p className="mt-3 text-sm leading-6 text-gray-500">
							Discover movies, explore new stories, and find your next favorite
							film with AI-powered search.
						</p>
					</div>

					{/* Navigation */}
					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Explore
						</h3>

						<div className="flex flex-col gap-3 text-sm">
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
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Built With
						</h3>

						<div className="flex flex-col gap-3 text-sm">
							<span>React</span>
							<span>Django REST Framework</span>
							<span>TMDB API</span>
							<span>Gemini AI</span>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="my-8 h-px bg-white/10" />

				{/* Footer Bottom */}
				<div className="flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
					<p>© {new Date().getFullYear()} NetflixGPT. Built for learning.</p>

					<p>Movie data provided by TMDB.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
