const express = require("express");
const router = express.Router();
const { googleAuth } = require("./controllers/auth.controller");

router.post("/login", googleAuth, (req, res, next) => {
  res.send({ idToken: req.body.idToken });
});

module.exports = router;
