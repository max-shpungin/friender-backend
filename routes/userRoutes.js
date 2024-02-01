const express = require("express");

const db = require("../db.js");
const router = new express.Router();
const User = require("../models/User")

/** GET /users: get list of users */
router.get("/", async function (req, res, next) {
  console.log('users route')
  const users = await User.getAllUsers();
  return res.json({ users });
});

/** GET /users: get list of users */
router.get("/:username", async function (req, res, next) {

  const {username} = req.params;

  console.log('username route')
  const user = await User.getUser(username);
  return user.json();

});

router.post("/", async function (req, res, next) {
  console.log('users route: post')

  const photo = req.body.photo;

  console.log('BACKEND: POST: req.body',req.body);
  console.log('BACKEND: POST: req.body.photo',photo);
  const user = await User.registerUser(req.body);
  return res.status(201).json({ user });

  // handle the file somehow this as the endpoint.
});

/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;