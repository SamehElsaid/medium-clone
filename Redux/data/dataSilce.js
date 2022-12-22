import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: false,
  user:false
};
const data = createSlice({
  name: "data",
  initialState,
  reducers: {
    SET_ARTICLE: (state, action) => {
      state.article = action.payload;
      // console.log(action.payload);
    },
    SET_USERS: (state, action) => {
      state.user = action.payload;
    },
  },
});
export let { SET_ARTICLE ,SET_USERS} = data.actions;
export default data.reducer;
