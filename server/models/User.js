const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // name is compulsory
      trim: true,     // removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,   // no two users with same email
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // only these 2 values allowed
      default: "user",         // everyone is a normal user by default
    },
  },
  { timestamps: true } // auto adds createdAt and updatedAt
);

module.exports = mongoose.model("User", userSchema);