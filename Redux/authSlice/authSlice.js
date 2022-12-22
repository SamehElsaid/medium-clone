import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedin: false,
    email:false
}
const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTICE_USER: (state, action) => {
            state.isLoggedin = true 
            state.email = action.payload
        },
        REMOVE_ACTICE_USER: (state, action) => {
            state.isLoggedin = false
        },
    }
})
export let { SET_ACTICE_USER, REMOVE_ACTICE_USER} = auth.actions
export default auth.reducer