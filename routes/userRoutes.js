const express = require("express");
const multer = require('multer');
const AWS = require('aws-sdk');
const db = require("../db.js");
const User = require("../models/User")

const router = new express.Router();
const s3 = new AWS.S3();
const upload = multer();
const myBucket = process.env.AWS_BUCKET_NAME;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

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
  return res.json(user);

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

router.patch("/:username", upload.single('file'), async function (req, res) {
  const {username} = req.params;
  console.log("back-end route username param: ", username);

  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    console.log("PATCH image, aws params", params);

    const uploadResult = await s3.upload(params).promise();

    //res.json({ message: "OMG WE DID IT!!!!", url: uploadResult.Location });

    // uploadResult.Location gives back URL, how to put this in the db with
    // the right user

    const editedUser = User.editUserImage(username, uploadResult.Location)
    return res.json({message:"updated photo!", editedUser});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "oh dear D:" });
  }
});

/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.delete("/:id", function (req, res) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;