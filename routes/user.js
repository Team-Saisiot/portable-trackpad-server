const express = require("express");
const {
  getRecentPc,
  getGesture,
  updateRecentPc,
} = require("./controllers/user.controller");
const router = express.Router();

router.route("/:users_id/gestures").get(getGesture).post(updateRecentPc);

module.exports = router;
