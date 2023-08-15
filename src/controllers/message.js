const MessageModel = require("../models/Message");
class MessageController {
  sendMessage(data) {
    return MessageModel.create(data);
  }
  editMessage(filter, data) {
    return MessageModel.findByIdAndUpdate(filter, data);
  }
  allMessage(filter) {
    return MessageModel.find(filter);
  }
  delteMessage(filter) {
    return MessageModel.deleteOne(filter);
  }
  paginate(filter, layout) {
    return MessageModel.paginate(filter, layout);
  }
}
module.exports = MessageController;
