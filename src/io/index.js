const io = require("socket.io");
const {
  MessageController,
  UserController,
  ChatController,
  SessionContoller,
} = require("../controllers/index.js");
const paginate = require("mongoose-paginate-v2");
//const { Uploads, Receive, Delete } = require("../AWS/index.js");

module.exports = (socket) => {
  //Chat
  const user = socket.user;
  // @description : Fetch all chats for user *** => we have bug
  socket.on("fetchChats", async (page = 1, limit = 10) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      console.log(user);
      let Chats = await ChatController.paginate({ members: user }, options);
      socket.emit("updateChats", Chats);
    } catch (e) {
      console.log(e.message);
    }
  });

  // @description : fetch one to one chat *** */
  socket.on("getChat", async (chatId) => {
    try {
      let chat = await ChatController.findById(chatId);
      chat && socket.emit("chat", chat);
    } catch (e) {
      console.log(e.message);
    }
  });

  // @description : create one to one chat *** */
  socket.on("newChat", async (members, page = 1, limit = 10) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      let chat = {
        creator: user,
        members: members,
      };
      const createdChat = await ChatController.create(chat);
      let Chats = await ChatController.paginate({ members: user._id }, options);
      socket.emit("createChat", createdChat);
    } catch (e) {
      console.log(e.message);
    }
  });

  //*** */
  socket.on("findUsers", async function (nameOrEmail) {
    try {
      const user = await UserController.find({
        $or: [
          { firstName: new RegExp(nameOrEmail, "i") },
          { lastName: new RegExp(nameOrEmail, "i") },
          { email: new RegExp(nameOrEmail, "i") },
        ],
      });
      socket.emit("findUsers", user);
    } catch (error) {
      console.log(error);
    }
  });

  //** */
  socket.on("all-message", async (chatId, page = 1, limit = 20) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      let messages = await MessageController.paginate(
        { chat: chatId },
        options
      );
      socket.emit("messageSend", messages);
    } catch (e) {
      console.log(e.message);
    }
  });

  //** => bug
  socket.on("edit-message", async (message_id, data, page = 1, limit = 20) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      let message = MessageController.editMessage(
        { $and: [{ _id: message_id }, { creator: user }] },
        data
      );
      let messages = await MessageController.paginate(
        { chat: message.chat },
        options
      );
      socket.emit("messages", messages);
    } catch (e) {
      console.log(e.message);
    }
  });

  //send message ** */
  socket.on("send-message", async (message, page = 1, limit = 10) => {
    try {
      //await Uploads(FilePath);
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      const Message = await MessageController.sendMessage({
        creator: user,
        chat: message.chat,
        status: message.status,
        title: message.title,
        body: message.body,
        //file: file,
      });
      let messages = await MessageController.paginate(
        { chat: message.chat },
        options
      );
      socket.emit("sendMessage", messages);
    } catch (e) {
      console.log(e.message);
    }
  });

  //** => we have bug
  socket.on("delete-message", async (message_id, page = 1, limit = 10) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      //await Delete(id);
      const message = MessageController.delteMessage({
        $and: [{ _id: message_id }, { creator: user }],
      });
      let messages = await MessageController.paginate(
        { chat: message.chat },
        options
      );
      socket.emit("messages", Messages);
    } catch (e) {
      console.log(e.message);
    }
  });

  //disconnects client ** bugs
  socket.on("disconnect", () => {
    try {
      UserController.updateOne({ _id: user.id }, { status: "Offline" });
      SessionContoller.delete({
        accessToken: socket.handshake.query?.accessToken,
      });
    } catch (e) {
      console.log(e.message);
    }
  });
};
