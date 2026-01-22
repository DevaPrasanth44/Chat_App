import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders chat component", () => {
  render(<App />);
  expect(screen.getByText(/chat app/i)).toBeInTheDocument();
});
