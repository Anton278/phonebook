import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/slice";
import contacts from "./contacts/slice";

export const store = configureStore({
  reducer: { auth, contacts },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
