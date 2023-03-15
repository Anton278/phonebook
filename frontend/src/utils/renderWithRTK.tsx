import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import auth from "../redux/auth/slice";
import contacts from "../redux/contacts/slice";

export const renderWithRTK = (
  component: React.ReactNode,
  preloadedState?: any
) => {
  const store = configureStore({ reducer: { auth, contacts }, preloadedState });

  return { store, ...render(<Provider store={store}>{component}</Provider>) };
};
