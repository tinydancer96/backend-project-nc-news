const {
  getCommentsByArticleId: getCommentsByArticleIdService,
  postCommentbyArticleId: postCommentbyArticleIdService,
} = require("../services/comments.service");
const InvalidInputError = require("../myErrorTypes/invalidInput");

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

exports.postCommentbyArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { author, body } = request.body;

  if (!body) {
    return new InvalidInputError("Missing body");
  }

  if (!author) {
    return new InvalidInputError("Missing author");
  }

  postCommentbyArticleIdService(article_id, author, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
};
