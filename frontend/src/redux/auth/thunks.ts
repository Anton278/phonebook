import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupValues } from "../../types/SignupValues";
import api, { BASE_URL } from "../../http";
import axios, { AxiosError } from "axios";
import { SigninValues } from "../../types/SigninValues";
import { IFail } from "@/types/IFail";
import { AuthResponse } from "@/types/AuthResponse";

export const signup = createAsyncThunk(
  "signup",
  async (params: SignupValues, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/registration",
        params
      );
      return response;
    } catch (e) {
      const error = e as AxiosError<IFail>;
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const signin = createAsyncThunk(
  "signin",
  async (params: SigninValues, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", params);
      return response;
    } catch (e) {
      const error = e as AxiosError<IFail>;
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const logout = createAsyncThunk("logout", () => {
  return api.post("/auth/logout");
});

export const refreshAccessToken = createAsyncThunk("refreshAccessToken", () => {
  return axios.get<AuthResponse>(BASE_URL + "/auth/refresh", {
    withCredentials: true,
  });
});
