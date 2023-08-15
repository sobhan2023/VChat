//Import
const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

require("dotenv").config();

require("./src/libs/mongo");

app.use("/api/v1", require("./src/routes/api/v1"));

// --------------------------DEPLOYMENT------------------------------
//Socket connection
const io = socket(server);
const listenSocket = require("./src/io/index");
const { ACLSocketMiddleware } = require("./src/middleware/acl");
io.use(ACLSocketMiddleware);
io.on("connection", (socket) => {
  listenSocket(socket);
});

server.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
