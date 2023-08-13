const SessionModel = require("../models/Session");
class SessionController {
  create(data) {
    return SessionModel.create(data);
  }
  find(filter) {
    return SessionModel.find(filter);
  }
  findOne(filter) {
    return SessionModel.findOne(filter);
  }
  findOneById(id) {
    return SessionModel.findOneById(id);
  }
  delete(filter) {
    return SessionModel.deleteMany(filter);
  }
}
module.exports = SessionController;
