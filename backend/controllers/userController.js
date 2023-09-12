const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userController = {};

userController.register = async (req, res) => {
  const body = req.body;
  const { name, email, password, pic } = body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", status: false });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      pic,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "Registered successfully", status: true, savedUser });
  } catch (error) {
    res.status(500).json("server error");
  }
};

userController.login = async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", status: false });
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return res
        .status(401)
        .json({ message: "Invalid Email or Password", status: false });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      password: user.password,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });

    res
      .status(201)
      .json({ message: "Logdin successfully", status: true, token: token });
  } catch (err) {
    return res.status(500).json("server error");
  }
};

userController.search = async (req, res) => {
  const keyword = req.query.search;

  const query = {
    $or: [
      { name: { $regex: keyword, $options: "i" } }, // Case-insensitive search
      { email: { $regex: keyword, $options: "i" } }, // Case-insensitive search
    ],
  };

  try {
    const result = await User.find(query).find({ _id: { $ne: req.user._id } });
    res.json(result);
  } catch (error) {
    // Handle errors, e.g., send an error response
    res
      .status(500)
      .json({ error: "An error occurred while searching for users" });
  }
};

module.exports = userController;
