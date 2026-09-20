import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import MainContainer from "../components/MainContainer"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies"
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import useUpcomingMovies from "../hooks/useUpComingMovies"
import GeminiSearchPage from "./GeminiSearchPage"
import axiosInstance from "../utils/axios"
import { useEffect } from "react"
import { setWatchlist } from "../redux/watchlistSlice"
import Footer from "../components/Footer"

const BrowsePage = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const testProfile = async () => {
			try {
				const response = await axiosInstance.get("profile/")
			} catch (error) {
				console.log("PROFILE ERROR:", error)
			}
		}

		testProfile()
	}, [])

	useEffect(() => {
		const fetchWatchlist = async () => {
			try {
				const response = await axiosInstance.get("watchlist/")

				dispatch(setWatchlist(response.data))
			} catch (error) {
				console.log("WATCHLIST ERROR:", error)
			}
		}

		fetchWatchlist()
	}, [dispatch])

	const showGeminiSearch = useSelector((store) => store.gemini.showGeminiSearch)
	useNowPlayingMovies()
	usePopularMovies()
	useUpcomingMovies()
	useTopRatedMovies()

	return (
		<div>
			<Header />
			{showGeminiSearch ? <GeminiSearchPage /> : <MainContainer />}
			<Footer />
		</div>
	)
}

export default BrowsePage
