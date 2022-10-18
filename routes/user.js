const express = require("express");
const { getRecentPc, getGesture } = require("./controllers/user.controller");
const router = express.Router();

router.get("/:users_id/gestures", getGesture);

router.get("/:users_id/pc", getRecentPc);

module.exports = router;
