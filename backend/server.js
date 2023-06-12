const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./errorHandler/errorHandler");
const userRoutes = require("./routes/UserRoutes");
const taskRoutes = require("./routes/TaskRoutes");
// connecting to database
mongoose.connect(
  "mongodb+srv://tmsp:tmsp@cluster0.eevaz.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) throw err;
    console.log("Database connected");
  }
);
app.use(express.json());
//using cors
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
//error handling
app.use(errorHandler);
app.listen(8080, () => {
  console.log(`server running on Port 8080`);
});
