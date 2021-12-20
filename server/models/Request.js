const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
