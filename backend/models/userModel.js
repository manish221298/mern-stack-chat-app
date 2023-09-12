const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/j/j/free-3201s2293j-siril-unstitched-original-imags5fbzhhqzzsz.jpeg?q=70",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);

module.exports = User;
