const findLocalIpAddress = require("local-devices");

exports.getLocalIps = async (req, res, next) => {
  const localIpAddress = await findLocalIpAddress();

  res.json({ localIpAddress });
};
