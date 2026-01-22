import { render, screen, fireEvent } from "@testing-library/react";
import Chat from "./Chat";
import io from "socket.io-client";

jest.mock("socket.io-client");

describe("Chat Component Tests", () => {

  beforeEach(() => {
    io.mockClear();
  });

  /* ✅ TEST 1 */
  test("renders chat header", () => {
    render(<Chat />);
    expect(screen.getByText("💬 Chat App")).toBeInTheDocument();
  });

  /* ✅ TEST 2 */
  test("renders input box and send button", () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText("Type a message...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  /* ✅ TEST 3 */
  test("allows typing a message", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input.value).toBe("Hello");
  });

  /* ✅ TEST 4 */
  test("emits socket event when send button is clicked", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText("Type a message...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Hello World" } });
    fireEvent.click(button);

    const socketInstance = io.mock.results[0].value;
    expect(socketInstance.emit).toHaveBeenCalledWith(
      "send_message",
      expect.objectContaining({ text: "Hello World" })
    );
  });

  /* ✅ TEST 5 */
  test("clears input after sending message", () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText("Type a message...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Test Message" } });
    fireEvent.click(button);

    expect(input.value).toBe("");
  });
});
