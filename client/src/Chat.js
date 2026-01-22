import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", { text: message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">💬 Chat App</div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.senderId === socket.id ? "own-message" : "other-message"
            }`}
          >
            {msg.text}
            <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default Chat;
