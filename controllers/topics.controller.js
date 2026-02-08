// const express = require("express");
// const app = express();
const {
  getAllTopics: getAllTopicsService,
} = require("../services/topics.service");

const getAllTopics = (request, response, next) => {
  getAllTopicsService()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getAllTopics };
