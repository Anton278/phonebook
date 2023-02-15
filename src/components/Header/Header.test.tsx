import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Header tests", () => {
  test("home redirect", () => {
    render(<Header />);

    const homeBtn = screen.getByTestId("home-btn");
    fireEvent.click(homeBtn);

    expect(pushMock.mock.calls[0][0]).toBe("");
  });
});
