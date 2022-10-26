const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");
const createError = require("http-errors");
const ERROR = require("../../constants/error");

exports.googleAuth = async (req, res, next) => {
  const client = new OAuth2Client(process.env.EXPO_CLIENT_ID);
  const { idToken } = req.body;

  let decoded;

  try {
    decoded = await client.verifyIdToken({
      idToken,
      audience: process.env.EXPO_CLIENT_ID,
    });
  } catch (error) {
    next(error);
  }

  if (!decoded) {
    next(createError(401, ERROR.INVALID_TOKEN));
  }

  try {
    const { name, email } = decoded.payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    res.json({ user, idToken: req.body.idToken });
  } catch (error) {
    next(error);
  }
};
