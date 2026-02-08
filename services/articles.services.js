const {
  fetchAllArticles,
  fetchArticleById,
} = require("../models/articles.model");
const NotFoundError = require("../myErrorTypes/notFound");

exports.getAllArticles = () => {
  return fetchAllArticles();
};

exports.getArticleById = (article_id) => {
  return fetchArticleById(article_id).then((article) => {
    if (article.length === 0) {
      throw new NotFoundError("This article id does not exist");
    }
    return article;
  });
};
