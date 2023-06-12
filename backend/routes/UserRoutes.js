const express = require("express");
const auth = require("../authMiddleware/auth");
const { signup, login, UserDashboard } = require("../controllers/UserCtrl");

const userRoutes = express.Router();
userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.get("/dashboard", auth, UserDashboard);
module.exports = userRoutes;
