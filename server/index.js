const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require("socket.io");
import path from "path"
const app = express();
import { fileURLToPath } from "url";



require("dotenv").config();
// The line require("dotenv").config();
// is typically used in Node.js applications to load environment variables from a .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')))
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);
// maybe

app.use('*', function(res, req){
res.sendFile(path.join(__dirname, './client/build/index.html'))
})


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

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});



const io = socket(server, {
  cors: {
    origin: "http://localhost:3000 ",
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
