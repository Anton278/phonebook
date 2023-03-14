import { Contact } from "@/types/Contact";
import { createSlice } from "@reduxjs/toolkit";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./thunks";

type InitState = {
  status: "loading" | "idle" | "error";
  isUpdating: boolean;
  updateError: string;
  isDeleting: boolean;
  deleteError: string;
  error: string;
  contacts: Contact[];
};

const initialState: InitState = {
  contacts: [],
  status: "idle",
  isUpdating: false,
  updateError: "",
  error: "",
  isDeleting: false,
  deleteError: "",
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
        /*  */
        state.contacts = [...state.contacts, action.payload];
        state.status = "idle";
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      })
      .addCase(updateContact.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const updatedContacts = state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        );
        state.contacts = updatedContacts;
        state.isUpdating = false;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.updateError = action.payload as string;
        state.isUpdating = false;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.isDeleting = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const updatedContacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.contacts = updatedContacts;
        state.isDeleting = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.deleteError = action.payload as string;
        state.isDeleting = false;
      }),
});

export default contacts.reducer;
