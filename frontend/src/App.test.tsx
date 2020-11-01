import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the title", () => {
  const { getByText } = render(<App />);
  const pageTitle = getByText("Your Holdings");
  expect(pageTitle).toBeInTheDocument();
});
