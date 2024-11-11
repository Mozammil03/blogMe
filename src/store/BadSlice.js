import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Your name",
  gender: "man",
};
const badSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    inputName: (state) => {
      state.name = "kch v";
      state.gender = "male";
    },
  },
});

export const { inputName } = badSlice.actions;
export default badSlice.reducer;
