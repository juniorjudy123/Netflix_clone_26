import React from "react"
import { lang } from "../utils/languageConstants"
import { useSelector } from "react-redux"

function GeminiSearchBar() {
	const langkey = useSelector((Store) => Store.config.lang)
	return (
		<div className="pt-[3%] flex justify-center">
			<form className="w-1/2 bg-black grid grid-cols-12">
				<input
					type="text"
					className="p-4 m-3 bg-white col-span-9"
					placeholder={lang[langkey].placeholder}
				></input>
				<button
					className=" bg-red-700 text-white
                rounded-lg  col-span-3 m-3"
				>
					{lang[langkey].search}
				</button>
			</form>
		</div>
	)
}

export default GeminiSearchBar
