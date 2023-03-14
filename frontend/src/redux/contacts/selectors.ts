import { RootState } from "../store";

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectStatus = (state: RootState) => state.contacts.status;
export const selectError = (state: RootState) => state.contacts.error;
export const selectIsUpdating = (state: RootState) => state.contacts.isUpdating;
export const selectUpdateError = (state: RootState) =>
  state.contacts.updateError;
