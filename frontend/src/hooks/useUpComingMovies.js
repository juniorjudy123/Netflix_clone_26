import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { API_OPTIONS } from '../utils/constants'
import { addUpComingMovies } from '../redux/moviesSlice'

function useUpComingMovies() {
    const dispatch = useDispatch()

    const upComingMovies = useSelector(store => store.movies.upComingMovies)


    const getUpComingMovies = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()

            dispatch(addUpComingMovies(data.results))
        } catch (error) {
            console.error("Failed to fetch popular movies:", error)
        }
    }

    useEffect(() => {
        !upComingMovies && getUpComingMovies()
    }, [])
}

export default useUpComingMovies