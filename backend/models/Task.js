const mongoose = require("mongoose");

module.exports = mongoose.model("Task", {
  title: String,
  status: { type: String, default: "Pending" },
  dueDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});