const user = require("./user");
const sessions = require("./session");
const chat = require("./chat");
const message = require("./message");
module.exports = {
  UserController: new user(),
  SessionContoller: new sessions(),
  ChatController: new chat(),
  MessageController: new message(),
};
