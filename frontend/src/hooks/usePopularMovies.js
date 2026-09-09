import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import { addPopularMovies } from '../redux/moviesSlice'

function usePopularMovies() {
    const dispatch = useDispatch()

    const popularMovies = useSelector(store => store.movies.popularMovies)

    const getPopularMovies = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()

            dispatch(addPopularMovies(data.results))
        } catch (error) {
            console.error("Failed to fetch popular movies:", error)
        }
    }

    useEffect(() => {
        !popularMovies && getPopularMovies()
    }, [])
}

export default usePopularMovies