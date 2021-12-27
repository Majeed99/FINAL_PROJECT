const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
  {
    usersOfRoom: { type: Array, required: true },
    RoomId: { type: String, required: true },
    messagesList: { type: Array, required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = chatSchema;
