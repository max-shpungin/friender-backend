/** Database setup for users. */

const { Client } = require("pg");

const DB_URI = process.env.NODE_ENV === "test"  // 1
    ? "postgresql:///friender_test"
    : "postgresql:///friender";

let db = new Client({
  connectionString: DB_URI
});

db.connect();                                   // 2

module.exports = db;                            // 3