const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Types.Schema.ObjectId,
        ref: "User",
      },
    ],
    lattestMessage: {
      type: mongoose.Types.Schema.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Types.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
