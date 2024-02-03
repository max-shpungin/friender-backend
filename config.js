"use strict";

/** Common config for Friender */

// read .env files and make environmental variables

require("dotenv").config();

const PORT = +process.env.PORT || 3001

const DB_URI = (process.env.NODE_ENV === "test")
    ? "postgresql:///friender_test"
    : process.env.DATABASE_URL || "postgresql:///friender";

function getDatabaseUri(){
  return DB_URI;
}

const SECRET_KEY = process.env.SECRET_KEY || "secret";



module.exports = {
  DB_URI,
  SECRET_KEY,
  PORT,
  getDatabaseUri
};