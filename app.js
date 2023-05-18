require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const e = require("express");
const axios = require("axios");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// initialised session
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: true,
  })
);

//initialised passport
app.use(passport.initialize());
app.use(passport.session());

//database creation
mongoose.connect("mongodb://0.0.0.0:27017/newEpics");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// enabling passport local mongoose
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get routes
app.get("/", (req, res) => {
  res.render("Home");
});
app.get("/contact", (req, res) => {
  res.render("Contact");
});
app.get("/telemedicine", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("Telemed");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//register routes
app.get("/register", (req, res) => {
  res.render("Register");
});
app.post("/register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/telemedicine");
        });
      }
    }
  );
});

// login routes
app.get("/login", (req, res) => {
  res.render("Login");
});
app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/telemedicine");
      });
    }
  });
});

// api

// const options = {
//   method: "GET",
//   url: "https://drug-info-and-price-history.p.rapidapi.com/1/druginfo",
//   params: { drug: "advil" },
//   headers: {
//     "X-RapidAPI-Key": "68e3afab45mshd5227285343f15bp1ba902jsn0b7786f3a169",
//     "X-RapidAPI-Host": "drug-info-and-price-history.p.rapidapi.com",
//   },
// };

// async function getMedicineData() {
//   try {
//     const res = await fetch(
//       "https://drug-info-and-price-history.p.rapidapi.com/1/druginfo",
//       options
//     );
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }
// getMedicineData();

app.listen(3000, (req, res) => console.log("listning to port 3000"));
