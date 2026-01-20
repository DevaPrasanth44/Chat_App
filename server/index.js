const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

console.log("🔥 THIS INDEX.JS FILE IS RUNNING 🔥");

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

const server = http.createServer(app);

// Create socket.io AFTER server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Socket logic
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("📩 Message received:", data);

    // send to everyone except sender
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
