const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require("socket.io");

const app = express();

require("dotenv").config();
// The line require("dotenv").config();
// is typically used in Node.js applications to load environment variables from a .env file

app.use(
  cors({
    origin: ["https://chat-applicaton-khaki.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);
// maybe

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connection is successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(5000, () => {
  console.log("Server is running on 5000");
});

const io = socket(server, {
  cors: {
    origin: "https://chat-applicaton-khaki.vercel.app ",
    // need to provide different origin while deploying the website
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
