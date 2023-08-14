const io = require("socket.io");
const {
  MessageController,
  UserController,
  ChatController,
} = require("../controllers/index.js");
const { Uploads, Receive, Delete } = require("../AWS/index.js");

module.exports = (io, socket) => {
  //Chat
  const user = socket.user;
  // @description : Fetch all chats for user ***
  socket.on("fetchChats", async (page = 1, limit = 10) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      let Chats = await ChatController.paginate({ members: user._id }, options);
      socket.emit("updateChats", Chats);
    } catch (e) {
      console.log(e.message);
    }
  });
  // @description : fetch one to one chat ***
  socket.on("getChat", async (chatId) => {
    try {
      let chat = ChatController.findById(chatId);
      chat && socket.emit("chat", chat);
    } catch (e) {
      console.log(e.message);
    }
  });
  // @description : create one to one chat ***
  socket.on("newChat", async (members, page, limit) => {
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
      const createdChat = await ChatController.createChat(chat);
      let Chats = await ChatController.paginate({ members: user._id }, options);
      socket.emit("createChat", createdChat);
    } catch (e) {
      console.log(e.message);
    }
  });
  //**
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
  //**
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

  //**
  socket.on("edit-message", async (message_id, data, page = 1, limit = 20) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      let message = MessageController.editMessage({ _id: message_id }, data);
      let messages = await MessageController.paginate(
        { chat: message.chat },
        options
      );
      socket.emit("messages", messages);
    } catch (e) {
      console.log(e.message);
    }
  });

  //send message **
  socket.on("send-message", async (message, page = 1, limit = 10) => {
    try {
      //await Uploads(FilePath);
      const options = {
        page: page,
        limit: limit,
        sort: { update_at: -1 },
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
  //**
  socket.on("delete-message", async (messageId, page = 1, limit = 10) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { updatedAt: -1 },
      };
      //await Delete(id);
      const message = MessageController.delteMessage({ _id: messageId });
      let messages = await MessageController.paginate(
        { chat: message.chat },
        options
      );
      socket.emit("messages", Messages);
    } catch (e) {
      console.log(e.message);
    }
  });

  //disconnects client **
  socket.on("disconnect", () => {
    try {
      const User = UserController.findOneById(user.id);
      if (User) {
        UserController.update({ _id: user.id }, { status: "Offline" });
      }
    } catch (e) {
      console.log(e.message);
    }
  });
};
