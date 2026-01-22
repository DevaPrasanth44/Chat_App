// Chat.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // your server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;
    socket.emit("message", inputMessage);
    setMessages((prev) => [...prev, inputMessage]);
    setInputMessage("");
  };

  return (
    <div>
      <h2>Chat App</h2>
      <div data-testid="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        data-testid="input-box"
        placeholder="Type message..."
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button data-testid="send-btn" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chat;
