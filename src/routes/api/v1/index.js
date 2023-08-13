const express = require("express");
const { version } = require("../../../../package.json");
const router = new express.Router();

router.get("/", (req, res) => {
  return res.send({ ok: true, version });
});
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));

module.exports = router;
