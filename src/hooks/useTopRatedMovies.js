import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import { addTopRatedMovies } from '../redux/moviesSlice'

function useTopRatedMovies() {
    const dispatch = useDispatch()

    const getTopRatedMovies = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()

            dispatch(addTopRatedMovies(data.results))
        } catch (error) {
            console.error("Failed to fetch top rated movies:", error)
        }
    }

    useEffect(() => {
        getTopRatedMovies()
    }, [])
}

export default useTopRatedMovies