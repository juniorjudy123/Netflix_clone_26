import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthLoading: true
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
            state.isAuthLoading = false

        },
        removeUser: (state) => {
            state.user = null
            state.isAuthLoading = false
        }

    }
})

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions