// const express = require("express");
const {
  getAllArticles: getAllArticlesService,
  getArticleById: getArticleByIdService,
  patchVoteByArticleId: patchVoteByArticleIdService,
  postArticle: postArticleService,
} = require("../services/articles.services");

exports.getAllArticles = async (request, response, next) => {
  const query = request.query;
  try {
    const articles = await getAllArticlesService(query);
    response.status(200).send({
      articles: articles.articles,
      total_count: articles.paginationInformation.articleCount,
      currentPage: `page ${articles.paginationInformation.currentPage} of ${articles.paginationInformation.pageCount}`,
    });
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

exports.postArticle = async (request, response, next) => {
  const author = request.body.author;
  const title = request.body.title;
  const body = request.body.body;
  const topic = request.body.topic;
  const article_img_url = request.body.article_img_url;
  try {
    const article = await postArticleService(
      author,
      title,
      body,
      topic,
      article_img_url,
    );
    // return response.status(200).send();
    // // console.log(article);
    return response.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
