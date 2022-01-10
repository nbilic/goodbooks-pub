const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportedUser: String,
    reportedBy: String,
    additionalInformation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
