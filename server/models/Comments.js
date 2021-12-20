const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userBookId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
