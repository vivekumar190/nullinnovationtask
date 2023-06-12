const asyncHandler = require("express-async-handler");
const Task = require("../modals/Task");
const User = require("../modals/User");
const addTask = asyncHandler(async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      throw new Error("Please enter all the detials");
    }
    if (!req.user) {
      throw new Error("Please Login to add Tasks");
    }
    console.log(req.user);
    const task = await new Task(req.body).save();
    await User.findByIdAndUpdate(req.user._id, {
      $push: { employees: employee.id },
    });
    res.json(task);
  } catch (error) {
    throw new Error(error);
  }
});
const updateTask = asyncHandler(async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName) {
      throw new Error("Please enter all the detials");
    }
    if (!req.user) {
      throw new Error("Please Login to add employees");
    }
    console.log(req.user);
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await task.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { employees: employee.id },
    });
    res.json(task);
  } catch (error) {
    res.json(error);
  }
});
const singleTask = asyncHandler(async (req, res) => {
  try {
    const employee = await Task.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.json(error);
  }
});
module.exports = {
  addTask,
  updateTask,
  deleteTask,
  singleTask,
};
