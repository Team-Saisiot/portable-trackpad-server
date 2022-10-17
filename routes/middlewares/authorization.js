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
      res.status(401).json({
        message: "unauthorized",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
