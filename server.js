const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// ROUTER REQUIRE
const usersRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");
const friendsRouter = require("./routers/friends.router");
// CONNECTION TO MONGOOSE DB
mongoose.connect(
  "mongodb+srv://admin:adminxx@cluster0.9badp.mongodb.net/finalProject?retryWrites=true&w=majority",
  {}
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// USE ROUTERS WITH PATH
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/friends", friendsRouter);

app.listen(port);
