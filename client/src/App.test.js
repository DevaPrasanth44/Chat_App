import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./Chat", () => () => <div>Chat Component</div>);

test("renders Chat component", () => {
  render(<App />);
  expect(screen.getByText("Chat Component")).toBeInTheDocument();
});
