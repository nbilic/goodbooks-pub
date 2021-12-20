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
    publisher: {
      type: String,
    },
    edition: {
      type: String,
    },
    description: {
      type: String,
    },
    pages: {
      type: Number,
    },
    genre: {
      type: [String],
      required: true,
    },
    language: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
