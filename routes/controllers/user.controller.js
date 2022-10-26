const User = require("../../models/User");
const nodemailer = require("nodemailer");

exports.getGesture = async (req, res, next) => {
  const email = req.params.users_id;

  try {
    const user = await User.findOne({ email });

    res.json({ gesture: user.gesture });
  } catch (error) {
    next(error);
  }
};

exports.getRecentPc = async (req, res, next) => {
  const email = req.params.users_id;

  try {
    const user = await User.findOne({ email });

    res.json({ recentPc: user.pc });
  } catch (error) {
    next(error);
  }
};

exports.updateRecentPc = async (req, res, next) => {
  const email = req.params.users_id;
  const recentPc = req.body.recentPc;
  const lastAccessDate = new Date();

  try {
    const user = await User.findOne({ email });

    return await User.updateOne(
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
  } catch (error) {
    next(error);
  }
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
    next(error);
  }
};

exports.updateGestures = async (req, res, next) => {
  try {
    const email = req.params.users_id;

    const gesture = req.body.updatedGesture;
    console.log("exports.updateGestures= ~ gesture", gesture);

    await User.updateOne({ email }, { $set: { gesture } });

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomGesture = async (req, res, next) => {
  try {
    const email = req.params.users_id;

    const user = await User.findOne({ email });

    const customGesture = {
      path: req.body?.path ? req.body?.path : user.customGesture.path,
      function: req.body?.function
        ? req.body?.function
        : user.customGesture.function,
    };

    await User.updateOne(
      { email },
      {
        $set: {
          customGesture,
        },
      },
    );

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getCustomGesture = async (req, res, next) => {
  const email = req.params.users_id;

  try {
    const user = await User.findOne({ email });

    res.json({ customGesture: user.customGesture });
  } catch (error) {
    next(error);
  }
};
