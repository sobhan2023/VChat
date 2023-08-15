const { SessionContoller } = require("../controllers/index.js");

async function ACLMiddleware(req, res, next) {
  try {
    const accessToken = req.headers.accesstoken;
    const session = await SessionContoller.findOne({ accessToken });
    if (session) {
      req.user = session.user;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.send({ ok: false, errorCode: 401 });
  }
}
//bug
async function ACLSocketMiddleware(socket, next) {
  const accessToken = socket.handshake.query?.accessToken;
  if (!accessToken) {
    return next(new Error("Invalid Socket Token"));
  }
  const session = await SessionContoller.findOne({ accessToken });
  if (session) {
    socket.user = session.user;
  }
  next();
}

module.exports = { ACLMiddleware, ACLSocketMiddleware };
