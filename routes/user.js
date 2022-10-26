const express = require("express");
const {
  getRecentPc,
  getGesture,
  getCustomGesture,
  updateRecentPc,
  updateGestures,
  updateCustomGesture,
  postEmail,
} = require("./controllers/user.controller");
const router = express.Router();

router.route("/:users_id/gestures").get(getGesture).post(updateGestures);
router
  .route("/:users_id/customGesture")
  .get(getCustomGesture)
  .post(updateCustomGesture);

router.route("/:users_id/pc").get(getRecentPc).post(updateRecentPc);

router.post("/email", postEmail);
module.exports = router;
