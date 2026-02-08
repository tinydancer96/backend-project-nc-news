const {
  getAllUsers: getAllUsersService,
} = require("../services/users.service");

const getAllUsers = (request, response) => {
  getAllUsersService().then((users) => {
    response.status(200).send({ users });
  });
};

module.exports = { getAllUsers };
