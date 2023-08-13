const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("debug", true);
try {
  mongoose.connect(MONGO_URI, options);
} catch (error) {
  mongoose.createConnection(MONGO_URI, options);
}
mongoose.connection
  .once("open", () => console.log("MONGO is up and running ..."))
  .on("error", () => console.log("MONGO is down"));
