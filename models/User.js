const db = require("../db");
const {UnauthorizedError} = require("../expressError")
//prob import errors as we need them

/** User static class and methods for interacting with DB */

class User {

  /** Make SQL query to Postgres to create a user on the Users table */
  static async registerUser(
    { username,
      password,
      hobbies,
      number_street_name,
      city,
      friend_radius,
      photo_url }
  ) {
    const result = await db.query(`
    INSERT INTO users
    (username,
      password,
      hobbies,
      number_street_name,
      city, friend_radius,
      photo_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING
      username,
      hobbies,
      number_street_name,
      city,
      friend_radius,
      photo_url`,
      [username,
        password,
        hobbies,
        number_street_name,
        city, friend_radius,
        photo_url]);

    const user = result.rows[0];

    return user;
  }

  /** Make SQL query to Postgres to validate user when logging in */

  static async loginUser({username, password}) {
    const result = await db.query(`
    SELECT username, password
    FROM users
    WHERE username = $1`, [username]
    );

    const user = result.rows[0]; // username, password

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = (password === user.password)

      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Make SQL query to Postgres to get all users from Users table */
  static async getAllUsers() {
    const result = await db.query(`
      SELECT username, password, hobbies, number_street_name, city, friend_radius, photo_url
      FROM users
      ORDER BY username`
    );
    //console.log('getAllUsers, result', result);
    return result.rows;
  }

  /** Make SQL query to Postgres to get all users from Users table */
  static async getUser(username) {
    const result = await db.query(`
    SELECT username, hobbies, number_street_name, city, friend_radius, photo_url
    FROM users
    WHERE username = $1`,
      [username]);

    const user = result.rows[0];

    return user;
  }

  /** Make SQL query to Postgres to edit user */
  static async editUser() { }

  /** Make SQL query to Postgres to edit user profile image */
  static async editUserImage(username, photoUrl) {
    const result = await db.query(`
      UPDATE users SET photo_url = $1
      WHERE username = $2
      RETURNING username, photo_url`,
      [photoUrl, username]);

    const editedUser = result.rows[0];

    return editedUser;
  }

  /** Make SQL query to Postgres to delete user */
  static async deleteUser() { }

}

module.exports = User;
