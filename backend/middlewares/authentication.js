const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  let tokenData;
  try {
    tokenData = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(tokenData.id).select("-password");
    next();
  } catch (err) {
    res.json(err.message);
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
};

module.exports = authenticateUser;
