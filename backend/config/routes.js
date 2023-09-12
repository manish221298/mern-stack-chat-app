const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/authentication");

const userController = require("../controllers/userController");
const chatController = require("../controllers/chatControllers");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", userAuthentication, userController.search);

// chat route
router.post("/chat/create", userAuthentication, chatController.create);

module.exports = router;
