import { Contact } from "@/types/Contact";
import { createSlice } from "@reduxjs/toolkit";
import { getContacts, addContact } from "./thunks";

type InitState = {
  status: "loading" | "idle" | "error";
  error: string;
  contacts: Contact[];
};

const initialState: InitState = {
  contacts: [],
  status: "idle",
  error: "",
};

const contacts = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.status = "idle";
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      })
      .addCase(addContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts = [...state.contacts, action.payload];
        state.status = "idle";
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      }),
});

export default contacts.reducer;
