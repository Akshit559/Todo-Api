const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Task = mongoose.model("Task", TaskSchema);
