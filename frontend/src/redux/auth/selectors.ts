import { RootState } from "../store";

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectSignupError = (state: RootState) => state.auth.signupError;
export const selectIsSignupProcessing = (state: RootState) =>
  state.auth.isSignupProcessing;
export const selectSigninError = (state: RootState) => state.auth.signinError;
export const selectIsSigninProcessing = (state: RootState) =>
  state.auth.isSigninProcessing;
