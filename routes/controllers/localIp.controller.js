const findLocalIpAddress = require("local-devices");

exports.getLocalIps = async (req, res, next) => {
  try {
    const localIpAddress = await findLocalIpAddress();

    return res.json({ localIpAddress });
  } catch (error) {
    return next(error);
  }
};
