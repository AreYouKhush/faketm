const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URI);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
