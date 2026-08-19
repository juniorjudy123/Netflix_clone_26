import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUpcomingMovies } from '../redux/moviesSlice'
import { API_OPTIONS } from '../utils/constants'

function useUpcomingMovies() {
    const dispatch = useDispatch()
    const getUpComingMovies = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()

            dispatch(addUpcomingMovies(data.results))
        } catch (error) {
            console.error("Failed to fetch popular movies:", error)
        }
    }

    useEffect(() => {
        getUpComingMovies()
    }, [])
}

export default useUpcomingMovies