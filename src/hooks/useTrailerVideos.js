import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import { addTrailerVideo } from '../redux/moviesSlice'

const useTrailerVideos = (movieId) => {
    const dispatch = useDispatch()



    const getTrailerVideos = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/videos?language=en-US",
                API_OPTIONS,
            )
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()
            console.log("data", data)

            const filteredData = data.results.filter(
                (video) => video.type === "Trailer",
            )
            const trailer = filteredData.length ? filteredData[0] : data.results[0]
            console.log("trailer", trailer)
            dispatch(addTrailerVideo(trailer))

            console.log("trailer", trailer)
        } catch (error) {
            console.error("Failed to fetch trailer videos:", error)
        }
    }

    useEffect(() => {
        getTrailerVideos()
    }, [])



}

export default useTrailerVideos