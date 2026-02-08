const { fetchCommentsByArticleId } = require("../models/comments.model");

exports.getCommentsByArticleId = (article_id) => {
  return fetchCommentsByArticleId(article_id).then((article) => {
    return article;
  });
};
