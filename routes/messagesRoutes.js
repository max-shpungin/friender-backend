const express = require("express");
const db = require("../db.js");
const Message = require("../models/Message");

const router = new express.Router();


/** GET /users: get list of users */
router.get("/", async function (req, res, next) {
  console.log('messages route')
  const messages = await Message.getAllMessages();

  const messageContent = messages.map(message => message.message_content)
  return res.json(messageContent);






});

module.exports = router;