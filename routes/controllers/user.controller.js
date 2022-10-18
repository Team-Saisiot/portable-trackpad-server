const User = require("../../models/User");

exports.getGesture = async (req, res, next) => {
  const userId = req.params.users_id;
  const user = await User.findOne({ email: userId });

  res.send({ gesture: user.gesture });
};

exports.getRecentPc = async (req, res, next) => {
  const email = req.params.users_id;

  const user = await User.findOne({ email });

  res.json({ recentPc: user.pc });
};

exports.updateRecentPc = async (req, res, next) => {
  const userId = req.params.users_id;
  const recentPc = req.body.recentPc;

  const user = await User.findOne({ email: userId });

  await User.updateOne(
    { email: userId },
    {
      name: user.name,
      email: user.email,
      gesture: user.gesture,
      pc: {
        name: recentPc.name,
        ipAddress: recentPc.ip,
        lastAccessData: new Date(),
      },
    },
  );
};
