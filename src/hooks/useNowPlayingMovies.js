import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import { addNowPlayingMovies } from '../redux/moviesSlice'

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    const getNowPlayingMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/now_playing?page=1",
                API_OPTIONS,
            )
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()

            dispatch(addNowPlayingMovies(data.results))
        } catch (error) {
            console.error("Failed to fetch now playing movies:", error)
        }
    }

    useEffect(() => {
        getNowPlayingMovies()
    }, [])

}

export default useNowPlayingMovies