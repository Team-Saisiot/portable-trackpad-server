const express = require("express");
const {
  getRecentPc,
  getGesture,
  updateRecentPc,
} = require("./controllers/user.controller");
const router = express.Router();

router.get("/:users_id/gestures", getGesture);

router.route("/:users_id/pc").get(getRecentPc).post(updateRecentPc);

module.exports = router;
