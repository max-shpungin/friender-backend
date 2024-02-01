const express = require("express");
const cors = require("cors");
const multer = require('multer');


const { NotFoundError } = require("./expressError");
const userRoutes = require("./routes/userRoutes");


//this is the bucket storage stuff
const upload = multer({ dest: 'uploads/' })

const app = express();
app.use(cors());
// process JSON body => req.body
app.use(express.json());

app.use("/users", userRoutes);

app.post("/test", upload.single('file'), function(req, res){
  console.log("req test", req.file)
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
