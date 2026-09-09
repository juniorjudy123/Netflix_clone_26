import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import { addTrailerVideo } from '../redux/moviesSlice'

const useTrailerVideos = (movieId) => {
    const dispatch = useDispatch()

    const trailerVideo = useSelector(store => store.movies.trailerVideo)

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


            const filteredData = data.results.filter(
                (video) => video.type === "Trailer",
            )
            const trailer = filteredData.length ? filteredData[0] : data.results[0]

            dispatch(addTrailerVideo(trailer))


        } catch (error) {
            console.error("Failed to fetch trailer videos:", error)
        }
    }

    useEffect(() => {
        !trailerVideo && getTrailerVideos()
    }, [])



}

export default useTrailerVideos