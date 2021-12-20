const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
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
    rating: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
