const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// database connection
mongoose.connect("mongodb://0.0.0.0:27017/userDb");
// user schema
const userSchema = {
  name: String,
  email: String,
  password: String,
};
// mongoose model
const Cat = mongoose.model("User", userSchema);

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

app.listen(3000, (req, res) => console.log("Listning on port 3000"));
