import express from "express";
import mongoose from "mongoose";
import path from "path";
import url from "url";
import bodyParser from "body-parser";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import User from "./models/UserModel.js";
import authRoutes from "./routes/auth.js";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRoutes);
// database connection
mongoose
  .connect("mongodb://0.0.0.0:27017/epicsDb")
  .then(() => console.log("success connecting to db"));

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

///////////////////////////////////////////// auth routes /////////////////////////////////////////////////
app.get("/signup", (req, res) => {
  res.render("Signup");
});

app.post("/signup", (req, res) => {
  let data = req.body;
  const newUser = new User({
    email: data.email,
    password: data.password,
  });

  newUser
    .save()
    .then(() => console.log("user from frontend saved succesfully"));

  res.redirect("/");
});

///////////////////////////////////////////// auth routes /////////////////////////////////////////////////
app.get("/login", (req, res) => {
  res.render("Login");
});

app.post("/login", (req, res) => {
  let data = req.body;
  const newUser = new User({
    email: data.email,
    password: data.password,
  });

  newUser
    .save()
    .then(() => console.log("user from frontend saved succesfully"));

  res.redirect("/");
});

// listen route
app.listen(3000, (req, res) => console.log("Listning on port 3000"));
