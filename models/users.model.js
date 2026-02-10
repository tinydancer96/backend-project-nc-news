const db = require("../db/connection");

exports.fetchAllUsers = async () => {
  const query = await db.query(`SELECT * FROM users`);
  return query.rows;
};

exports.fetchUserById = async (username) => {
  const query = await db.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return query.rows;
};
