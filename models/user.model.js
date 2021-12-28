const postSchema = require("./post.model");
const chatSchema = require("./chat.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, sparse: true },
    name: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    header: {
      type: String,
      default:
        "https://i.pinimg.com/564x/5b/01/1c/5b011c6ef65dfded3a246cb856ed9a4a.jpg",
    },
    gender: { type: String },
    location: { type: String },
    bio: { type: String },
    requests: { type: Array, default: [] },
    friends: { type: Array, default: [] },
    posts: { type: [postSchema], default: [] },
    chats: { type: [chatSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
