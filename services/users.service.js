const { fetchAllUsers, fetchUserById } = require("../models/users.model");

exports.getAllUsers = () => {
  return fetchAllUsers();
};

exports.userbyId = (username) => {
  return fetchUserById(username);
};
