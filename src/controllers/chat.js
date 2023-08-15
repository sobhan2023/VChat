const { query } = require("express");
const ChatModel = require("../models/Chat");
class ChatController {
  create(data) {
    return ChatModel.create(data);
  }
  find(filter) {
    return ChatModel.find(filter);
  }
  findById(id) {
    return ChatModel.findById(id);
  }
  findAndUpdate(filter, data) {
    return ChatModel.findAndUpdate(filter, data);
  }
  paginate(filter, layout) {
    return ChatModel.paginate(filter, layout);
  }
}

module.exports = ChatController;
