const io = require("socket.io");
const {
  MessageController,
  UserController,
  ChatController,
} = require("../controllers/index.js");
const { Uploads, Receive, Delete } = require("../AWS/index.js");

module.exports = (io, socket) => {
  //Chat
  // @description : Join room

  // @description : Fetch all chats for user **
  socket.on("chat-history", async (user, page = 1, limit = 10) => {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { update_at: -1 },
      };
      let Chats = await ChatController.paginate({}, options);
      io.to(user).emit("Chats", Chats);
    } catch (e) {
      console.log(e.message);
    }
  });

  // @description : fetch one to one chat
  socket.on("fetchChat", async () => {
    try {
      let chatExists = ChatController.chatFind(chat._id);
      if (chatExists.length > 0) {
        socket.emit("chataccess", chatExists);
      } else {
        socket.emit("fetchChat", "Error");
      }
    } catch (e) {
      console.log(e.message);
    }
  });
  // @description : create one to one chat
  socket.on("createChat", async (user, secondUser) => {
    try {
      let chatExists = {
        creator: user,
        members: [user, secondUser],
      };
      const createdChat = await ChatController.createChat(chatExists);
      socket.emit("createChat", createdChat);
    } catch (e) {
      console.log(e.message);
    }
  });

  //Message
  socket.on("messageAll", async (user, query) => {
    try {
      let allMessage = await MessageController.allMessage(user.id, query).sorts(
        {
          update_at: -1,
        }
      );
      socket.emit("messageSend", allMessage);
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("messageUpdate", (message_id, data) => {
    try {
      MessageController.editMessage({ message_id }, data).sorts({
        update_at: -1,
      });
      socket.emit("Recievechat", Receive(FilePath));
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("messageSend", async (user, message, chat, file, query) => {
    try {
      Uploads(FilePath);
      const Message = await MessageController.sendMessage({
        creator: user,
        chat: chat,
        status: message.status,
        title: message.title,
        body: message.body,
        file: file,
      });
      let Chats = await MessageController.allMessage().sort({
        timestamp: 1,
      });
      io.to(receiver).emit("sendMessage", Chats);
      socket.emit("messageSend", allMessage);
    } catch (e) {
      console.log(e.message);
    }
  });

  //AWS
  socket.on("messageRecieve", (FilePath) => {
    try {
      socket.emit("recieveMessage", Receive(FilePath));
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("delete-message", async (data) => {
    try {
      const { sender, receiver, id } = data;
      await Delete(id);
      MessageController.delteMessage(id);
      const Messages = await MessageController.allMessage({ creator: sender });
      io.to(sender).emit("message-response", Messages);
      io.to(receiver).emit("message-response", Messages);
    } catch (e) {
      console.log(e.message);
    }
  });

  //disconnects client
  socket.on("disconnect", (user) => {
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
