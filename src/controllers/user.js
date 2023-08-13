const UserModel = require("../models/User");
class UserController {
  create(data) {
    return UserModel.create(data);
  }
  find(filter = {}) {
    return UserModel.find(filter);
  }
  findOne(filter, options = {}) {
    return UserModel.findOne(filter, options);
  }
  findOneById(id) {
    return UserModel.findOne({ _id: id });
  }
  findAndUpdate(filter, data, options = {}) {
    return UserModel.findOneAndUpdate(filter, data, options);
  }
  update(filter, data) {
    return UserModel.update(filter, data);
  }
}
module.exports = UserController;
