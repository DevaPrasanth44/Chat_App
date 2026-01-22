// Chat.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Chat from "./Chat";

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
    const button = screen.getByText("Send");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("can type in input box", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText("Type message...");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input.value).toBe("Hello");
  });

  test("can send a message and clear input", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText("Type message...");
    const button = screen.getByText("Send");

    fireEvent.change(input, { target: { value: "Hello World" } });
    fireEvent.click(button);

    // Message should appear in messages list
    const message = screen.getByText("Hello World");
    expect(message).toBeInTheDocument();

    // Input should be cleared
    expect(input.value).toBe("");
  });
});
