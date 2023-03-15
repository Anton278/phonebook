import { renderWithRTK } from "@/utils/renderWithRTK";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

const pushMock = jest.fn((to) => to);

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: pushMock,
    };
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

describe("Header tests", () => {
  test("contacts and add contact buttons should be displayed if auth", () => {
    renderWithRTK(<Header />, {
      auth: {
        isAuth: true,
      },
    });

    const contactsBtn = screen.getByTestId("contacts-button");
    const addContactBtn = screen.getByTestId("add-contact-button");

    expect(contactsBtn).toBeInTheDocument();
    expect(addContactBtn).toBeInTheDocument();
  });

  test("contacts and add contact buttons should not be displayed if not auth", () => {
    renderWithRTK(<Header />);

    const contactsBtn = screen.queryByTestId("contacts-button");
    const addContactBtn = screen.queryByTestId("add-contact-button");

    expect(contactsBtn).toBeNull();
    expect(addContactBtn).toBeNull();
  });

  test("signup and signin buttons should be displayed if not auth", () => {
    renderWithRTK(<Header />);

    const signupBtn = screen.getByTestId("signup-button");
    const signinBtn = screen.getByTestId("signin-button");

    expect(signupBtn).toBeInTheDocument();
    expect(signinBtn).toBeInTheDocument();
  });

  test("signout button should be displayed if auth", () => {
    renderWithRTK(<Header />, { auth: { isAuth: true } });

    const signoutBtn = screen.getByTestId("signout-button");

    expect(signoutBtn).toBeInTheDocument();
  });
});
