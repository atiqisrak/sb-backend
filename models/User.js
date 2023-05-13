const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, unique: true },
  password: { type: String, required: true },
  nid: { type: Number, required: true },
  registrationNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
