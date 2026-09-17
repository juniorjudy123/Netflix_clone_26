import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice"
import moviesReducer from "../redux/moviesSlice"
import geminiReducer from "../redux/geminiSlice"
import configReducer from "../redux/configSlice"
import watchlistReducer from "../redux/watchlistSlice"

const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer,
            gemini: geminiReducer,
            config: configReducer,
            watchlist: watchlistReducer,

        }
    }
)



export default appStore