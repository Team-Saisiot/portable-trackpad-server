const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/:users_id/gestures", async (req, res, next) => {
  const userId = req.params.users_id;
  const user = await User.findOne({ email: userId });

  res.send({ gesture: user.gesture });
});

module.exports = router;
