import GeminiSearchBar from "../components/GeminiSearchBar"
import GeminiMovieSuggestions from "../components/GeminiMovieSuggestions"
import { BG_URL } from "../utils/constants"

function GeminiSearchPage() {
	return (
		<div>
			<div className="absolute inset-0 -z-10">
				<img
					className=" h-full w-full object-cover"
					src={BG_URL}
					alt="background-img"
				/>
			</div>
			<GeminiSearchBar />
			<GeminiMovieSuggestions />
		</div>
	)
}

export default GeminiSearchPage
