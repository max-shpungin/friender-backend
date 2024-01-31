const express = require("express");

const db = require("../db.js");//FIXME: needs updates probably
const router = new express.Router();
const User = require("../models/User")

/** GET /users: get list of users */
router.get("/", function (req, res, next) {
  return res.json(User.getAllUsers());
});

/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;