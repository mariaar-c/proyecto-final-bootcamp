const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["user", "owner"],
      default: "user",
    },
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
