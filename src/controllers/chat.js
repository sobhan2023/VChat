const { query } = require("express");
const ChatModel = require("../models/Chat");
class ChatController {
  chatFind(filter) {
    return ChatModel.find(filter);
  }
  createChat(data) {
    return ChatModel.create(data);
  }
  FindAndUpdate(filter, data) {
    return ChatModel.findByIdAndUpdate(filter, data);
  }
}

module.exports = ChatController;
