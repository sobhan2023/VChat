const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: true,
    },
    mobile: String,
    avatar: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
