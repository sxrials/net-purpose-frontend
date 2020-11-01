import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the title", () => {
    const { getByText } = render(<App />);
    const pageTitle = getByText("Your Holdings");
    expect(pageTitle).toBeInTheDocument();
  });

  it("renders the main menu", () => {
    const { getByTestId } = render(<App />);
    const mainMenu = getByTestId("nav");
    expect(mainMenu).toBeInTheDocument();
  });
});
