const {
  fetchAllArticles,
  fetchArticleById,
} = require("../models/articles.model");
const NotFoundError = require("../myErrorTypes/notFound");
const InvalidInputError = require("../myErrorTypes/invalidInput");
exports.getAllArticles = () => {
  return fetchAllArticles();
};

exports.getArticleById = (article_id) => {
  if (isNaN(Number(article_id))) {
    throw new InvalidInputError(
      "Please provide valid article_id",
      "Location: articles.services.js",
    );
  }

  return fetchArticleById(article_id).then((article) => {
    if (article.length === 0) {
      throw new NotFoundError(
        "This article id does not exist",
        "Location: articles.services.js",
      );
    } else {
      return article;
    }
  });
};
