import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    email: "Guest",
    userType: undefined,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { setEmail } = navbarSlice.actions;
export const { setUserType } = navbarSlice.actions;

export const selectEmail = (state) => state.navbar.email;
export const selectUserType = (state) => state.navbar.userType;

export default navbarSlice.reducer;
