const express = require("express");
const { getUser } = require("../../../../libs/auth/google");
const {
  UserController,
  SessionContoller,
} = require("../../../../controllers/index.js");
const router = new express.Router();

router.put("/register", async (req, res) => {
  try {
    const { accessToken } = req.body;
    const _user = await getUser(accessToken);
    const data = {
      firstname: _user?.given_name,
      lastname: _user?.family_name,
      email: _user.email,
      avatar: _user?.picture,
    };
    const user = await UserController.findAndUpdate(
      { email: _user.email },
      data,
      {
        upsert: true,
        new: true,
      }
    );
    await SessionContoller.create({ user: user._id, accessToken });
    return res.send({ ok: true, user });
  } catch (error) {
    res.send({ ok: false, messages: [error?.message || "Some Error"] });
  }
});

module.exports = router;
