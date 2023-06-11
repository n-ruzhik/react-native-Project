import { createSlice } from "@reduxjs/toolkit";
import { registration, logIn, logOut } from "./operations";

const initialState = {
  userId: "",
  userName: "",
  email: "",
  image: "",
  isLogIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        const { userId, name, email, photo } = payload;
        state.userId = userId;
        state.userName = name;
        state.email = email;
        state.image = photo;
        state.isLogIn = true;
        state.isLoading = false;
      })
      .addCase(registration.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        const { userId, name, email, photo } = payload;
        state.userId = userId;
        state.userName = name;
        state.email = email;
        state.image = photo;
        state.isLogIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.userId = "";
        state.userName = "";
        state.email = "";
        state.image = "";
        state.isLogIn = false;
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
