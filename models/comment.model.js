const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    userId: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = commentSchema;
