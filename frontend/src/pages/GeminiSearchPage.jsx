import Header from "../components/Header"
import GeminiSearchBar from "../components/GeminiSearchBar"
import GeminiMovieSuggestions from "../components/GeminiMovieSuggestions"
import Footer from "../components/Footer"
import { BG_URL } from "../utils/constants"

function GeminiSearchPage() {
	return (
		<div className="relative flex min-h-screen flex-col bg-black">
			{/* Background */}
			<div className="fixed inset-0 -z-10">
				<img
					className="h-full w-full object-cover"
					src={BG_URL}
					alt="background-img"
				/>
				<div className="absolute inset-0 bg-black/60" />
			</div>

			{/* Header */}
			<Header />

			{/* Main Content */}
			<main className="relative flex-1">
				<div className="md:p-[2%]">
					<GeminiSearchBar />
					<GeminiMovieSuggestions />
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default GeminiSearchPage
