var express = require("express");
var router = express.Router();
const passport = require("passport");
const db = require("../models");
const User = db.users;

require("dotenv").config();

router.get("/login", async (req, res, next) => {
  const user = req.token;

  res.render("login", {
    user: user,
  });
});

router.get("/answersheet", async (req, res, next) => {
  const user = req.token;

  res.render("answersheet", {
    user: user,
  });
});
router.post(
  "/login",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/user/login",
  })
);

router.get("/register", async (req, res, next) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await User.sync();

  const userfilter = await User.findOne({
    where: {
      username: username,
    },
  });

  if (userfilter) {
    return;
  } else {
    var data = {
      username: username,
      password: password,
      admin: false,
    };
    User.create(data).then(function (data) {
      console.log(data);
      res.redirect("/");
    });
  }
});

router.get("/logout", async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
