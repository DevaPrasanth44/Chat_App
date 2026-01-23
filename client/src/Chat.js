// Chat.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css"; // 🔥 IMPORTANT

const socket = io("http://localhost:8080");

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
    if (!inputMessage.trim()) return;

    socket.emit("message", inputMessage);
    setMessages((prev) => [...prev, inputMessage]);
    setInputMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat App</div>

      <div className="chat-body" data-testid="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="chat-message own-message"
          >
            {msg}
            <small>Now</small>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          data-testid="input-box"
          type="text"
          placeholder="Type message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button data-testid="send-btn" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;
