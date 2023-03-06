import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout, refreshAccessToken, signin, signup } from "./thunks";

type InitState = {
  name: string;
  isAuth: boolean;
  signupError: string;
  isSignupProcessing: boolean;
  signinError: string;
  isSigninProcessing: boolean;
};

const initialState: InitState = {
  name: "",
  isAuth: false,
  signupError: "",
  isSignupProcessing: false,
  signinError: "",
  isSigninProcessing: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      state.isAuth = false;
      state.name = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signup.pending, (state) => {
        state.signupError = "";
        state.isSignupProcessing = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.data.accessToken);
        state.name = action.payload.data.name;
        state.isAuth = true;
        state.isSignupProcessing = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuth = false;
        state.signupError = action.payload as string;
        state.isSignupProcessing = false;
      })
      .addCase(signin.pending, (state) => {
        state.signinError = "";
        state.isSigninProcessing = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.data.accessToken);
        state.name = action.payload.data.name;
        state.isAuth = true;
        state.isSigninProcessing = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.signinError = action.payload as string;
        state.isSigninProcessing = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.name = "";
        localStorage.removeItem("token");
        state.isAuth = false;
        state.name = "";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.data.accessToken);
        state.name = action.payload.data.name;
        state.isAuth = true;
      }),
});

export const { setIsAuth } = auth.actions;

export default auth.reducer;
