const db = require("../db");
//prob import errors as we need them

/** User static class and methods for interacting with DB */

class User {

  /** Make SQL query to Postgres to create a user on the Users table */
  static async registerUser() { }

  /** Make SQL query to Postgres to validate user when logging in */
  // Probably handled via passport module
  static async authenticateUser() { }

  /** Make SQL query to Postgres to get all users from Users table */
  static async getAllUsers() {
    const result = await db.query(`
      SELECT username, password, hobbies, number_street_name, city, friend_radius, photo_url
      FROM users
      ORDER BY username`
    );
    console.log('getAllUsers, result', result);
    return result.rows;
  }

  /** Make SQL query to Postgres to get all users from Users table */
  static async getUser() { }

  /** Make SQL query to Postgres to edit user */
  static async editUser() { }

  /** Make SQL query to Postgres to delete user */
  static async deleteUser() { }

}

module.exports = User;
