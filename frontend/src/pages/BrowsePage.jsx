import { useSelector } from "react-redux"
import Header from "../components/Header"
import MainContainer from "../components/MainContainer"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies"
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import useUpcomingMovies from "../hooks/useUpComingMovies"
import GeminiSearchPage from "./GeminiSearchPage"
import axiosInstance from "../utils/axios"
import { useEffect } from "react"

const BrowsePage = () => {
	useEffect(() => {
		const testProfile = async () => {
			try {
				const response = await axiosInstance.get("profile/")
				console.log("PROFILE:", response.data)
			} catch (error) {
				console.log("PROFILE ERROR:", error)
			}
		}

		testProfile()
	}, [])
	const showGeminiSearch = useSelector((store) => store.gemini.showGeminiSearch)
	useNowPlayingMovies()
	usePopularMovies()
	useUpcomingMovies()
	useTopRatedMovies()

	return (
		<div>
			<Header />
			{showGeminiSearch ? <GeminiSearchPage /> : <MainContainer />}
		</div>
	)
}

export default BrowsePage
