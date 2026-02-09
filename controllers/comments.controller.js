const {
  getCommentsByArticleId: getCommentsByArticleIdService,
} = require("../services/comments.service");

exports.getCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  getCommentsByArticleIdService(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((error) => {
      next(error);
    });
};
