import express from "express";
import mongoose from "mongoose";
import path from "path";
import url from "url";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cookieParser from "cookie-parser";
import User from "./models/UserModel.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRoutes);

// database connection
mongoose
  .connect("mongodb://0.0.0.0:27017/epicsDb")
  .then(() => console.log("success connecting to db"));
//////////////////////////middleware////////////////////////
const checkLoggedIn = (req, res, next) => {
  if (req.cookies.Login) {
    let isVerified = jwt.verify(req.cookies.Login, process.env.JWT_SECRET);
    if (isVerified) {
      next();
    } else {
      console.log("invalid user");
    }
  } else {
    console.log("operation not allowed");
    res.redirect("/signup");
  }
};
// get routes
app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/about", (req, res) => {
  res.render("About");
});
app.get("/contact", (req, res) => {
  res.render("Contact");
});

app.get("/telemedicine", checkLoggedIn, (req, res) => {
  res.render("Telemed");
});

///////////////////////////////////////////// auth routes /////////////////////////////////////////////////
app.get("/signup", (req, res) => {
  res.render("Signup");
});

app.post("/signup", (req, res) => {
  try {
    let data = req.body;
    const newUser = new User({
      email: data.email,
      password: data.password,
    });

    newUser
      .save()
      .then(() => console.log("user from frontend saved succesfully"));

    res.cookie("isLoggedIn", token, { maxAge: 60 * 1000, httpOnly: true });
    res.redirect("/telemedicine");
  } catch (err) {
    console.log(err);
  }
});

///////////////////////////////////////////// auth routes /////////////////////////////////////////////////
app.get("/login", (req, res) => {
  res.render("Login");
});

app.post("/login", async (req, res) => {
  try {
    let data = req.body;
    const user = await User.findOne({ email: data.email });

    if (user) {
      if (user.password === data.password) {
        // payload
        let payload = user["_id"];
        // signature
        let token = jwt.sign(
          {
            payload: payload,
          },
          process.env.JWT_SECRET
        );
        res.cookie("Login", token, { maxAge: 60 * 1000, httpOnly: true });
        res.redirect("/telemedicine");
      } else {
        console.log("wrong credentials");
      }
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.log(`error occured ${err}`);
  }
});

// listen route
app.listen(3000, (req, res) => console.log("Listning on port 3000"));
