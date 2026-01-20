import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      text: message,
      time: new Date().toLocaleTimeString()
    });

    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Room</div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.own ? "own-message" : "other-message"
            }`}
          >
            <span>{msg.text}</span>
            <small>{msg.time}</small>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
