const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");

exports.googleAuth = async (req, res, next) => {
  const client = new OAuth2Client(process.env.EXPO_CLIENT_ID);
  const { idToken } = req.body;

  let decoded;

  try {
    decoded = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.EXPO_CLIENT_ID,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }

  if (!decoded) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  try {
    const { name, email } = decoded.payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed. Please try again",
    });
  }
};
