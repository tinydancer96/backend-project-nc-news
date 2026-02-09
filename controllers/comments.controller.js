const {
  getCommentsByCommentId: getCommentsByCommentIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
  postCommentbyArticleId: postCommentbyArticleIdService,
  deleteCommentByArticleId: deleteCommentByArticleIdService,
} = require("../services/comments.service");
const InvalidInputError = require("../myErrorTypes/invalidInput");

exports.getCommentsByCommentId = (request, response, next) => {
  const { comment_id } = request.params;
  getCommentsByCommentIdService(comment_id)
    .then((comment) => {
      response.status(200).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};

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

exports.deleteCommentByArticleId = (request, response, next) => {
  const { comment_id } = request.params;
  deleteCommentByArticleIdService(comment_id)
    .then((comment) => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};
