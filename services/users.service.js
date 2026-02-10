const { fetchAllUsers, fetchUserById } = require("../models/users.model");

exports.getAllUsers = async () => {
  return fetchAllUsers();
};

exports.userbyId = async (username) => {
  return fetchUserById(username);
};
