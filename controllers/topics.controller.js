// const express = require("express");
// const app = express();
const {
  getAllTopics: getAllTopicsService,
  getTopicBySlug: getTopicBySlugService,
} = require("../services/topics.service");

exports.getAllTopics = async (request, response, next) => {
  // getAllTopicsService()
  //   .then((topics) => {
  //     response.status(200).send({ topics });
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });

  try {
    const topics = await getAllTopicsService();
    response.status(200).send({ topics });
  } catch (error) {
    next(error);
  }
};

exports.getTopicBySlug = (request, response, next) => {
  const { slug } = request.params;
  getTopicBySlugService(slug)
    .then((topic) => {
      response.status(200).send({ topic });
    })
    .catch((error) => {
      next(error);
    });
};
