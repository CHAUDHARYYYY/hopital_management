import express from "express";
import mongoose from "mongoose";
import path from "path";
import url from "url";
import bodyParser from "body-parser";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import authRoutes from "./routes/auth.js";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRoutes);
// database connection
mongoose
  .connect("mongodb://0.0.0.0:27017/userDb")
  .then(() => console.log("success connecting to db"));
// user schema
const userSchema = {
  name: String,
  email: String,
  password: String,
};
// mongoose model
const User = mongoose.model("User", userSchema);

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
app.get("/signup", (req, res) => {
  res.render("Signup");
});
app.post("/signup", (req, res) => {
  let obj = req.body;
  console.log(obj);

  res.json({
    message: "user signed up",
    data: obj,
  });
});

// post routes
app.listen(3000, (req, res) => console.log("Listning on port 3000"));
