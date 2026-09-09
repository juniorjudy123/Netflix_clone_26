import GeminiSearchBar from "../components/GeminiSearchBar"
import GeminiMovieSuggestions from "../components/GeminiMovieSuggestions"
import { BG_URL } from "../utils/constants"

function GeminiSearchPage() {
	return (
		<div>
			<div className="fixed inset-0 -z-10">
				<img
					className=" h-full w-full object-cover"
					src={BG_URL}
					alt="background-img"
				/>
			</div>
			<div className="md:p-[2%]">
				<GeminiSearchBar />
				<GeminiMovieSuggestions />
			</div>
		</div>
	)
}

export default GeminiSearchPage
