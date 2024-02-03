/** Database setup for users. */

const { Client } = require("pg");
const {getDatabaseUri} = require("./config")

// const DB_URI = process.env.NODE_ENV === "test"  // 1
//     ? "postgresql:///friender_test"
//     : "postgresql:///friender";

let db = new Client({
  connectionString: getDatabaseUri()
});

db.connect();

module.exports = db;