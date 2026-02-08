const express = require("express");
const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
} = require("../services/articles.services");

exports.getAllArticles = (request, response) => {
  getAllArticlesService().then((articles) => {
    response.status(200).send({ articles });
  });
};

exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  getArticleByIdService(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};
