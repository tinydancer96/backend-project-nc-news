const db = require("../db/connection");

exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users`).then((users) => {
    return users.rows;
  });
};

exports.fetchUserById = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((user) => {
      return user.rows;
    });
};
