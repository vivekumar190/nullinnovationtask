const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    description: {
      type: "String",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
    timeseries: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
