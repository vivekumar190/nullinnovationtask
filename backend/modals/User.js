const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: "String",
      required: true,
    },
    firstName: {
      type: "String",
      required: true,
    },
    lastName: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    token: {
      type: "String",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);
// usign virtual properties to link tasks created to users
UserSchema.virtual("tasklist", {
  ref: "Task",
  foreignField: "user",
  localField: "_id",
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
