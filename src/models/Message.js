const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const MessageSchema = new mongoose.Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    status: {
      type: Number,
      enum: [0, 1],
    },
    title: String,
    body: String,
    //file: Object,
  },
  { timestamp: true }
);
MessageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Message", MessageSchema);
