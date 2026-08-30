import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice"
import moviesReducer from "../redux/moviesSlice"
import geminiReducer from "../redux/geminiSlice"

const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer,
            gemini: geminiReducer

        }
    }
)

console.log(appStore.getState());

export default appStore