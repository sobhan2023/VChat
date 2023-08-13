const router = new require("express").Router();
const { ACLMiddleware } = require("../../../../middleware/acl");

router.use(ACLMiddleware);
router.get("/me", async (req, res) => {
  const user = req.user;
  return res.send({ ok: true, user });
});

module.exports = router;
