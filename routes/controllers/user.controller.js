const User = require("../../models/User");
const nodemailer = require("nodemailer");

exports.getGesture = async (req, res, next) => {
  const email = req.params.users_id;
  const user = await User.findOne({ email });

  res.json({ gesture: user.gesture });
};

exports.getRecentPc = async (req, res, next) => {
  const email = req.params.users_id;
  const user = await User.findOne({ email });

  res.json({ recentPc: user.pc });
};

exports.updateRecentPc = async (req, res, next) => {
  const email = req.params.users_id;
  const recentPc = req.body.recentPc;
  const lastAccessDate = new Date();

  const user = await User.findOne({ email });

  await User.updateOne(
    { email },
    {
      name: user.name,
      email: user.email,
      gesture: user.gesture,
      pc: {
        name: recentPc.name,
        ipAddress: recentPc.ipAddress,
        lastAccessDate,
      },
    },
  );
};

exports.postEmail = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.MAILS_EMAIL,
        pass: process.env.MAILS_PWD,
      },
      secure: true,
    });
    const email = req.body.email;
    const htmlContent = `
      <h1>Hello User!</h1>
      <p>
        <h2>아래의 링크를 통해 다운로드 받을 수 있습니다. (차후 다운로드 링크로 변경할 예정)</h2>
        <h3>https://github.com/Team-Saisiot/portable-trackpad-package<h3>
      </p>
    `;
    const mailOption = {
      from: process.env.MAILS_EMAIL,
      to: email,
      subject: "Portable Trackpad Desktop Application Download",
      html: htmlContent,
    };

    await transporter.sendMail(mailOption);

    res.json({ result: "success" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Send email failed, Please try again.",
    });
  }
};
