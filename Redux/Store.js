import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice/authSlice";
import data from "./data/dataSilce"

const store = configureStore({
    reducer: {
        auth,
        data
    }
})
export default store