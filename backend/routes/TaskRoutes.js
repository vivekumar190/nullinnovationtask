const express = require("express");
const auth = require("../authMiddleware/auth");
const {
  addTask,
  updateTask,
  deleteTask,
  singleTask,
} = require("../controllers/TaskCtrl");
const taskRoutes = express.Router();

taskRoutes.post("/addTask", auth, addTask);
taskRoutes.put("/updateTask/:id", auth, updateTask);
taskRoutes.delete("/deleteTask/:id", auth, deleteTask);
taskRoutes.get("/task/:id", auth, singleTask);

module.exports = taskRoutes;
