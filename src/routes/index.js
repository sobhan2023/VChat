const express = require("express");
const router = new express.Router();

router.use("/api/v1", require("./api/v1"));

module.exports = router;
