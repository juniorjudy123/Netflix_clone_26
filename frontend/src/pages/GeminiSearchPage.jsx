import Header from "../components/Header"
import GeminiSearchBar from "../components/GeminiSearchBar"
import GeminiMovieSuggestions from "../components/GeminiMovieSuggestions"
import Footer from "../components/Footer"
import { BG_URL } from "../utils/constants"

function GeminiSearchPage() {
	return (
		<div className="relative flex min-h-screen flex-col bg-black ">
			{/* Background */}
			<div className="fixed inset-0 z-0">
				<img
					className="h-full w-full object-cover"
					src={BG_URL}
					alt="background-img"
				/>
				<div className="absolute inset-0 bg-black/60 rounded-lg" />
			</div>

			{/* Header */}
			<div className="relative z-20">
				<Header />
			</div>

			{/* Main Content */}
			<main className="relative z-10 px-4  flex-1 pt-24 sm:pt-28 md:pt-32">
				<div className="md:p-[2%] ">
					<GeminiSearchBar />
					<GeminiMovieSuggestions />
				</div>
			</main>
			<div className="relative z-20 ">
				<Footer />
			</div>
		</div>
	)
}

export default GeminiSearchPage
