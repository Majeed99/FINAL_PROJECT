const commentSchema = require("./comment.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    text: { type: String, required: false },
    location: { type: String, required: true },
    locationId: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: [commentSchema], required: false, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = postSchema;
