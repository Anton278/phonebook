import api from "@/http";
import { Contact } from "@/types/Contact";
import { IFail } from "@/types/IFail";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getContacts = createAsyncThunk(
  "getContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Contact[]>("/contacts");
      return response.data;
    } catch (e) {
      const error = e as AxiosError<IFail>;
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
