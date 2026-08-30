import React from "react"
import GeminiSearchBar from "../components/GeminiSearchBar"
import GeminiMovieSuggestions from "../components/GeminiMovieSuggestions"

function GeminiSearchPage() {
	return (
		<div>
			<div className="absolute inset-0 -z-10">
				<img
					className=" h-full w-full object-cover"
					src="https://assets.nflxext.com/ffe/siteui/vlv3/0ce6c17e-e188-4f13-aaf2-6366e12ba739/web/IN-en-20260803-TRIFECTA-perspective_7730cca2-6324-4104-bf66-1a1f6e1a3e61_large.jpg"
					alt="background-img"
				/>
			</div>
			<GeminiSearchBar />
			<GeminiMovieSuggestions />
		</div>
	)
}

export default GeminiSearchPage
