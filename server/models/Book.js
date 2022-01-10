const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    edition: {
      type: String,
    },
    pages: {
      type: Number,
    },
    genre: {
      type: String,
      required: true,
    },
    cover: String,
    submittedBy: String,
    approved: {
      type: Boolean,
      default: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
