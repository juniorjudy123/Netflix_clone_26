import { createSlice } from "@reduxjs/toolkit"

const geminiSlice = createSlice({
	name: "gemini",
	initialState: {
		showGeminiSearch: false,
		geminiSearch: null,
		geminiMovieResults: null,
	},
	reducers: {
		toggleGeminiSearchView: (state) => {
			state.showGeminiSearch = !state.showGeminiSearch
		},

		addGeminiSearch: (state, action) => {
			state.geminiSearch = action.payload
		},

		addGeminiMovieResults: (state, action) => {
			const { movieNames, movieResults } = action.payload
			state.geminiSearch = movieNames
			state.geminiMovieResults = movieResults
		},
	},
})

export const { toggleGeminiSearchView, addGeminiMovieResults } =
	geminiSlice.actions

export default geminiSlice.reducer
