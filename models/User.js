const mongoose = require("mongoose");

const gestureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  custom: {
    type: Boolean,
  },
  function: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gesture: [gestureSchema],
});

module.exports = mongoose.model("User", userSchema);
