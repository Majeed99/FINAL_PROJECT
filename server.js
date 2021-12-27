const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.json());

// ROUTER REQUIRE
const usersRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");
const friendsRouter = require("./routers/friends.router");
const adminsRouter = require("./routers/admin.router");
// CONNECTION TO MONGOOSE DB
mongoose.connect(
  "mongodb+srv://admin:adminxx@cluster0.9badp.mongodb.net/finalProject?retryWrites=true&w=majority",
  {}
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  // console.log("User Connected: ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User with ID: ", socket.id, " Room ID:", data);
  });

  socket.on("send_message", (data) => {
    socket.join(data);
    socket.to(data.room).emit("receive_message", data);
    // console.log(data);
  });

  socket.on("disconnect", () => {
    // console.log("USER disconnected", socket.id);
  });
});

// USE ROUTERS WITH PATH
app.use(express.static("frontend/build"));
app.use("/api/admins", adminsRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/friends", friendsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});
// app.listen(port);

server.listen(port);
