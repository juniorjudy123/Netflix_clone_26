import React from "react"

function GeminiSearchBar() {
	return (
		<div className="pt-[3%] flex justify-center">
			<form className="w-1/2 bg-black grid grid-cols-12">
				<input
					type="text"
					className="p-4 m-3 bg-white col-span-9"
					placeholder="what would you like to watch today?"
				></input>
				<button
					className=" bg-red-700 text-white
                rounded-lg  col-span-3 m-3"
				>
					search
				</button>
			</form>
		</div>
	)
}

export default GeminiSearchBar
