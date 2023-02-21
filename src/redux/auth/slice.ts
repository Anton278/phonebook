import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signin, signup } from "./thunks";

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
      .addCase(signup.fulfilled, (state) => {
        // state.isAuth = true;
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
        localStorage.setItem(
          "refreshToken",
          action.payload.data.token.refresh_Token
        );
        localStorage.setItem(
          "accessToken",
          action.payload.data.token.access_Token
        );
        state.name = action.payload.data.displayName;
        state.isAuth = true;
        state.isSigninProcessing = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isAuth = false;
        state.signinError = action.payload as string;
        state.isSigninProcessing = false;
      }),
});

export const { setIsAuth } = auth.actions;

export default auth.reducer;
