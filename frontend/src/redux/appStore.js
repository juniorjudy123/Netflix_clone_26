import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice"
import moviesReducer from "../redux/moviesSlice"
import geminiReducer from "../redux/geminiSlice"
import configReducer from "../redux/configSlice"

const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer,
            gemini: geminiReducer,
            config: configReducer

        }
    }
)



export default appStore