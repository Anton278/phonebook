import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupValues } from "../../types/SignupValues";
import api from "../../http";
import { AxiosError } from "axios";

export const signup = createAsyncThunk(
  "signup",
  async (params: SignupValues, { rejectWithValue }) => {
    try {
      const response = api.post("/register", params);
      return response;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(
        "Unrecognized error happened. Please, try again later."
      );
    }
  }
);
