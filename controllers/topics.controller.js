const express = require("express");
const app = express();
const {
  getAllTopics: getAllTopicsService,
} = require("../services/topics.service");

const getAllTopics = (request, response) => {
  getAllTopicsService().then((topics) => {
    response.status(200).send({ topics });
  });
};

module.exports = { getAllTopics };
