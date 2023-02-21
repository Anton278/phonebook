import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signup } from "./thunks";

type InitState = {
  name: string;
  isAuth: boolean;
  signupError: string;
  isSignupProcessing: boolean;
};

const initialState: InitState = {
  name: "",
  isAuth: false,
  signupError: "",
  isSignupProcessing: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signup.pending, (state) => {
        state.signupError = "";
        state.isSignupProcessing = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isSignupProcessing = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuth = false;
        state.signupError = action.payload as string;
        state.isSignupProcessing = false;
      }),
});

export const { setIsAuth } = auth.actions;

export default auth.reducer;
