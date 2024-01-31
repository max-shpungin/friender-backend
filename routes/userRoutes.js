const express = require("express");

const db = require("./fakeDb");//FIXME: needs updates probably
const router = new express.Router();

/** GET /users: get list of users */
router.get("/", function (req, res) {
  return res.json(db.User.all());
});

/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;