const UserSchema = require("../Model/User");
const nodemailer = require("nodemailer");
const fast2sms = require("fast-two-sms");

const Getuser = async (req, res) => {
  res.render("user/userdata");
};
// --------creating user details------
const CreateUser = async (req, res) => {
  let { name, email, mobnumber } = req.body;

  let payload = { name, email, mobnumber };
  console.log(payload);
  //-----saving data in mongodb------
  await new UserSchema(payload).save();
  //-----sending data in throw mail----
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vijaykumart8896@gmail.com",
      pass: "gdnwfyzniwhmjwua",
    },
  });

  var mailOptions = {
    from: "vijaykumart8896@gmail.com",
    to: "vijaysmith8896@gmail.com",
    subject: "Sending Email using Express.js",
    text: `
    Name : ${name} 
    Email : ${email}
    Mobile number : ${mobnumber}
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  console.log("email sent da macha");
  //-----sending data throw FAST_TWO_SMS----messages---

  var options = {
    authorization:
      "lmLEDsGhJBSiOGS64ueNnQlRJzG1CGwSaZWDhypXANQU6QSYD9ow0TLieNLp",
    message: `Name : ${name} 
Email : ${email}
Mobile number : ${mobnumber}`,
    numbers: ["9035342310"],
  };

  fast2sms
    .sendMessage(options)
    .then(() => {
      console.log("Message sent da macha");
    })
    .catch((err) => {
      console.log(err);
    });

  req.flash("SUCCESS_MESSAGES", "successfully sent data");
  res.redirect("/user/create", 301, {});
};

module.exports = { Getuser, CreateUser };
