const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const multer = require('multer');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const upload = multer();
const myBucket = process.env.AWS_BUCKET_NAME;


const { NotFoundError } = require("./expressError");
const userRoutes = require("./routes/userRoutes");


app.use(cors());

// process JSON body => req.body
app.use(express.json());

app.use("/users", userRoutes);

app.post("/test", upload.single('file'), async function (req, res) {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const uploadResult = await s3.upload(params).promise();

    res.json({ message: "OMG WE DID IT!!!!", url: uploadResult.Location });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "oh dear D:" });
  }
});

/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
