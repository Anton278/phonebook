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

type AddContactParams = {
  name: string;
  phone: string;
};

export const addContact = createAsyncThunk(
  "addContact",
  async (params: AddContactParams, { rejectWithValue }) => {
    try {
      const response = await api.post<Contact>("/contacts", params);
      return response.data;
    } catch (e) {
      const error = e as AxiosError<IFail>;
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

type UpdateContactParams = {
  name: string;
  phone: string;
  contactId: string;
};

export const updateContact = createAsyncThunk(
  "updateContact",
  async (params: UpdateContactParams, { rejectWithValue }) => {
    try {
      const response = await api.put<Contact>("/contacts", params);
      return response.data;
    } catch (e) {
      const error = e as AxiosError<IFail>;
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
