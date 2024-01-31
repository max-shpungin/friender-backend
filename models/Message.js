/** User static class and methods for interacting with DB */

class Message {

  /** Make SQL query to Postgres to create a message on the Messages table */
  static async createMessage() { }


  /** Make SQL query to Postgres to get all messages from Messages table */
  static async getAllMessages() { }

  /** Make SQL query to Postgres to get single message from Messages table */
  static async getMessage() { }

  /** Make SQL query to Postgres to edit message */
  static async editUser() { }

  /** Make SQL query to Postgres to delete message */
  static async deleteUser() { }

}

module.exports = Message;
