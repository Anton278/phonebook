import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupValues } from "../../types/SignupValues";
import api from "../../http";
import { AxiosError } from "axios";
import { SigninValues } from "../../types/SigninValues";
import { SigninResponse } from "../../types/SigninResponse";

export const signup = createAsyncThunk(
  "signup",
  async (params: SignupValues, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", params);
      return response;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(
        "Unrecognized error happened. Please, try again later."
      );
    }
  }
);

export const signin = createAsyncThunk(
  "signin",
  async (params: SigninValues, { rejectWithValue }) => {
    try {
      const response = await api.post<SigninResponse>("/login", params);
      return response;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(
        "Unrecognized error happened. Please, try again later."
      );
    }
  }
);
