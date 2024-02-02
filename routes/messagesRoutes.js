const express = require("express");
const db = require("../db.js");
const Message = require("../models/Message");

const router = new express.Router();


/** GET /messages: get list of messages */
router.get("/", async function (req, res, next) {
  console.log('messages route');
  const messages = await Message.getAllMessages();

  const messageContent = messages.map(message => message.message_content);
  return res.json(messageContent);

});


/** Add new message to DB *///FIXME: NOT USING ATM
router.post("/", async function (req, res, next) {
  console.log('messages route: messages');
  const newMessage = req.body.message;
  console.log('messages: create message, newMessage',newMessage);

  const message = await Message.createMessage(newMessage);
  return res.status(201).json({ user });

  // handle the file somehow this as the endpoint.


});

module.exports = router;