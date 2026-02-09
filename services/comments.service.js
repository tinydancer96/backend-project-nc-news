const { fetchCommentsByArticleId } = require("../models/comments.model");
const { fetchArticleById } = require("../models/articles.model");
const InvalidInputError = require("../myErrorTypes/invalidInput");
const NotFoundError = require("../myErrorTypes/notFound");

exports.getCommentsByArticleId = (article_id) => {
  if (isNaN(Number(article_id))) {
    throw new InvalidInputError(
      "Please provide a valid article_id",
      "Location: comments.service.js",
    );
  }

  return fetchArticleById(article_id).then((article) => {
    if (article.length === 0) {
      throw new NotFoundError(
        "This article id does not exist",
        "Location: articles.services.js",
      );
    }
    return fetchCommentsByArticleId(article_id).then((comments) => {
      if (comments.length === 0) {
        return "There are no comments for this article";
      } else {
        return comments;
      }
    });
  });
};
