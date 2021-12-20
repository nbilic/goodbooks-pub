const mongoose = require("mongoose");

const userBookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    google: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserBook", userBookSchema);
