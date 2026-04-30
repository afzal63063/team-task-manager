const mongoose = require("mongoose");

module.exports = mongoose.model("Project", {
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});