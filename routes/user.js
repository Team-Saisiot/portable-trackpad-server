const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/:users_id/gestures", async (req, res, next) => {
  const userId = req.params.users_id;
  const user = await User.findOne({ email: userId });

  res.send({ gesture: user.gesture });
});

router.get("/:users_id/pc", async (req, res, next) => {
  const email = req.params.users_id;

  const user = await User.findOne({ email });

  res.send({ recentPc: user.pc });
});

module.exports = router;
