// const express = require("express");
const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  patchVoteByArticleId: patchVoteByArticleIdService,
} = require("../services/articles.services");

exports.getAllArticles = async (request, response, next) => {
  const query = request.query;
  try {
    const articles = await getAllArticlesService(query);
    response.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};

exports.getArticleById = async (request, response, next) => {
  const { article_id } = request.params;
  try {
    const article = await getArticleByIdService(article_id);
    response.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};

exports.patchVoteByArticleId = async (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  try {
    const updatedArticle = await patchVoteByArticleIdService(
      article_id,
      inc_votes,
    );
    res.status(200).send({ article: updatedArticle });
  } catch (error) {
    next(error);
  }
};
