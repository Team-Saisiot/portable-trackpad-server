const { OAuth2Client } = require("google-auth-library");

exports.verifyToken = async (req, res, next) => {
  const client = new OAuth2Client(process.env.EXPO_CLIENT_ID);
  const { idToken } = req.body;

  try {
    const decoded = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.EXPO_CLIENT_ID,
    });

    if (!decoded) {
      next(createError(401, ERROR.INVALID_TOKEN));
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
