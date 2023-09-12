const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const chatController = {};

chatController.create = async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    res.status(400).json("there didn't user id");
  }
  try {
    // Check if a chat already exists between the current user and the specified userId
    const existingChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] }, // Check for both users in the 'users' array
    })
      .populate("users", "-password")
      .populate("latestMessage.sender", "name pic email");

    if (existingChat) {
      return res.status(200).json(existingChat);
    } else {
      // Create a new chat if it doesn't exist
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);

      // Populate the created chat's 'users' field excluding passwords
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json(fullChat);
    }
  } catch (err) {
    res.status(500).json(err.message);
    // console.log(err.message);
  }
};

module.exports = chatController;
