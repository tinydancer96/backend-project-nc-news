const {
  getAllUsers: getAllUsersService,
  userbyId: userbyIdService,
} = require("../services/users.service");

const getAllUsers = (request, response) => {
  getAllUsersService().then((users) => {
    response.status(200).send({ users });
  });
};

const userbyId = (request, response) => {
  const { username } = request.params;
  userbyIdService(username).then((user) => {
    response.status(200).send({ user });
  });
};
module.exports = { getAllUsers, userbyId };
