const db = require("../db");

/** User static class and methods for interacting with DB */

class Message {

  /** Make SQL query to Postgres to create a message on the Messages table */
  static async createMessage(message_content) {
    const result = db.query(`
      INSERT INTO messages (message_content)
      VALUES ($1)
    `, [message_content]);
   }


  /** Make SQL query to Postgres to get all messages from Messages table */
  static async getAllMessages() {
    const result = await db.query(`
    SELECT message_content
    FROM messages
    ORDER BY id ASC`)

    return result.rows
  }

  /** Make SQL query to Postgres to get single message from Messages table */
  static async getMessage() { }

  /** Make SQL query to Postgres to edit message */
  static async editUser() { }

  /** Make SQL query to Postgres to delete message */
  static async deleteUser() { }

}

module.exports = Message;
