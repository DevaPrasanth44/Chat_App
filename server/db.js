const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/chatapp");

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected");
});
