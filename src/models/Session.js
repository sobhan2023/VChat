const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Session", SessionSchema);
