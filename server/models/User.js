const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 12,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg",
    },
    description: {
      type: String,
      max: 50,
    },
    books: {
      type: [],
    },
    isAdmin: {
      type: Boolean,
      default: "false",
    },
    friends: {
      type: [],
    },
    requests: [{}],
    banned: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
