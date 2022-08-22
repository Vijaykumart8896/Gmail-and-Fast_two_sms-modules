const express = require("express");
const nodemailer = require("nodemailer");
const { PORT, MONGODB_URL } = require("./config/index");
const { engine } = require("express-handlebars");
const { connect } = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const GetRouter = require("./routes/user");
const app = express();

// handlebars set up;
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// Set path for static file;
app.use(express.static(__dirname + "/public"));
//body parser
app.use(express.urlencoded({ extended: true }));
// injecting middlewares
app.use(
  session({
    secret: "vijay",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
// ------flash messages function-----
app.use(function (req, res, next) {
  res.locals.SUCCESS_MESSAGES = req.flash("SUCCESS_MESSAGES");
  next();
});

// mounting
app.use("/user", GetRouter);

let StartServer = async () => {
  try {
    await connect(MONGODB_URL);
    console.log("mongodb connected succesfully");
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`server is listening on port number ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
StartServer();
