const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const ChatSchema = new mongoose.Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User", require: true }],
  },
  { timestamps: true }
);
ChatSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Chat", ChatSchema);
