const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../modals/User");
const homeCtrl = (req, res) => {
  res.json("home");
};
const signup = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!firstName || !password || !lastName || !email) {
    throw new Error("Please enter all the details");
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error(`User already exist with email: ${user?.email}`);
  }
  try {
    //securing the password
    const salt = await bcrypt.genSalt(10);
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const user = await new User(req.body).save();
    console.log(user);
    const token = jwt.sign({ id: user._id }, "SecretKey", {
      expiresIn: "24d",
    });
    res.json({ token, user });
  } catch (error) {
    res.json({ error });
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Wrong username or password");
  }
  const authenticUser = await bcrypt.compare(password, user.password);
  if (!authenticUser) {
    throw new Error("Wrong username or password");
  }
  const token = jwt.sign({ id: user?._id }, "SecretKey", { expiresIn: "24d" });

  res.json({
    _id: user._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    tasks: user?.tasks,
    token: token,
  });
});
//get Task of a user
const UserDashboard = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new Error("Login is required");
  }
  try {
    const manager = await Manager.findById(req.user._id).populate("tasks");
    res.json(manager);
  } catch (error) {
    res.json(error);
  }
});
module.exports = { homeCtrl, signup, login, UserDashboard };
