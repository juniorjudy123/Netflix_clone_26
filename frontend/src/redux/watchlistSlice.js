import { createSlice } from "@reduxjs/toolkit";


const watchlistSlice = createSlice({
    name: 'watchlist',

    initialState: {
        movies: []
    },


    reducers: {
        setWatchlist: (state, action) => {
            state.movies = action.payload
        },
        addToWatchlist: (state, action) => {
            state.movies.push(action.payload)
        },

        removeFromWatchlist: (state, action) => {
            state.movies = state.movies.filter(
                movie => movie.id !== action.payload
            )
        },



    }
})

export const {
    setWatchlist, addToWatchlist, removeFromWatchlist
} = watchlistSlice.actions


export default watchlistSlice.reducer
