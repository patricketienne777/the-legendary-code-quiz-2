const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const cors = require("cors");
const Handlebars = require("handlebars");
const cookieParser = require("cookie-parser");
const path = require("path");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const homeRoutes = require("./routes/home.js");
const userRouter = require("./routes/user.js");
const db = require("./models");
const User = db.users;
require("dotenv").config();

const secret = "hamham";
const PORT = 3000;

// User Auth

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authUser = async (user, password, done) => {
  console.log(`Value of "User" in authUser function ----> ${user}`);
  console.log(`Value of "Password" in authUser function ----> ${password}`);

  const userfilter = await User.findOne({
    where: {
      username: user,
    },
  });

  if (userfilter) {
    if (user === userfilter.username && password === userfilter.password) {
      let authenticated_user;

      if (userfilter.admin === true) {
        authenticated_user = {
          id: userfilter.id,
          username: userfilter.username,
          admin: true,
        };
      } else {
        authenticated_user = {
          id: userfilter.id,
          username: userfilter.username,
          admin: false,
        };
      }

      return done(null, authenticated_user);
    } else {
      return done(null, false);
    }
  } else {
    return done(null, false);
  }
};

passport.use("local-signup", new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("---------> Deserialize Id");
  console.log(user);

  done(null, user);
});

// User Auth End

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  engine({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("views", path.join(__dirname, "/views/"));

app.use(express.static("public"));

app.use("/", homeRoutes);
app.use("/user", userRouter);

// create user(admin) when server starts.

const createUser = async () => {
  await User.sync();

  const userfilter = await User.findOne({
    where: {
      username: "admin",
    },
  });

  if (userfilter) {
    return;
  } else {
    var data = {
      username: "admin",
      password: "12345",
      admin: true,
    };
    User.create(data).then(function (data) {
      console.log(data);
    });
  }
};

createUser();

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
