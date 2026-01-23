// Chat.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Chat from "../Chat";

// Mock socket.io-client
jest.mock("socket.io-client", () => {
  return jest.fn(() => ({
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  }));
});

describe("Chat Component", () => {
  test("renders input box and send button", () => {
    render(<Chat />);

    const input = screen.getByPlaceholderText("Type message...");
    const button = screen.getByTestId("send-btn");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("allows typing in the input box", () => {
    render(<Chat />);

    const input = screen.getByPlaceholderText("Type message...");
    fireEvent.change(input, { target: { value: "Hello" } });

    expect(input.value).toBe("Hello");
  });

  test("sends a message and clears the input", () => {
    render(<Chat />);

    const input = screen.getByPlaceholderText("Type message...");
    const button = screen.getByTestId("send-btn");

    fireEvent.change(input, { target: { value: "Hello World" } });
    fireEvent.click(button);

    // Message appears in chat body
    expect(screen.getByText("Hello World")).toBeInTheDocument();

    // Input is cleared
    expect(input.value).toBe("");
  });
});
