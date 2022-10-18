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

const pcSchema = new mongoose.Schema({
  name: { type: String },
  ipAddress: { type: String },
  lastAccessDate: { type: Date },
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
  pc: pcSchema,
});

module.exports = mongoose.model("User", userSchema);
