import mongoose from "mongoose";

// user schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("user", userSchema);

export default User;
