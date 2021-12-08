const postSchema = require("./post.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    location: { type: String },
    bio: { type: String },
    requests: { type: Array, default: [] },
    friends: { type: Array, default: [] },
    posts: { type: [postSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
