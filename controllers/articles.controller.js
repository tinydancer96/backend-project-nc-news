// const express = require("express");
const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  patchVoteByArticleId: patchVoteByArticleIdService,
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

exports.patchVoteByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  patchVoteByArticleIdService(article_id, inc_votes)
    .then((updatedArticle) => res.status(200).send({ article: updatedArticle }))
    .catch(next);
};
