const {
  getAllUsers: getAllUsersService,
  userbyId: userbyIdService,
} = require("../services/users.service");

const getAllUsers = async (request, response) => {
  try {
    const users = await getAllUsersService();
    response.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};

const userbyId = async (request, response) => {
  const { username } = request.params;
  try {
    const user = await userbyIdService(username);
    response.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, userbyId };
