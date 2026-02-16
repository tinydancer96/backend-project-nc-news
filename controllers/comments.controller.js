const {
  getCommentsByCommentId: getCommentsByCommentIdService,
  getCommentsByArticleId: getCommentsByArticleIdService,
  postCommentbyArticleId: postCommentbyArticleIdService,
  deleteCommentByArticleId: deleteCommentByArticleIdService,
} = require("../services/comments.service");
const InvalidInputError = require("../myErrorTypes/invalidInput");

exports.getCommentsByCommentId = async (request, response, next) => {
  const { comment_id } = request.params;

  try {
    const comment = await getCommentsByCommentIdService(comment_id);
    response.status(200).send({ comment });
  } catch (error) {
    next(error);
  }
};

exports.getCommentsByArticleId = async (request, response, next) => {
  const { article_id } = request.params;
  const query = request.query;
  try {
    const comments = await getCommentsByArticleIdService(article_id, query);
    response.status(200).send({
      comments: comments.paginatedResults,
      articleCount: comments.articleCount,
      currentPage: comments.currentPage,
      pageCount: comments.pageCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.postCommentbyArticleId = async (request, response, next) => {
  const { article_id } = request.params;
  const { author, body } = request.body;

  if (!body) {
    return new InvalidInputError("Missing body");
  }

  if (!author) {
    return new InvalidInputError("Missing author");
  }

  try {
    const comment = await postCommentbyArticleIdService(
      article_id,
      author,
      body,
    );
    return response.status(201).send({ comment });
  } catch (error) {
    next(error);
  }
};

exports.deleteCommentByArticleId = async (request, response, next) => {
  const { comment_id } = request.params;
  try {
    const deleteComment = await deleteCommentByArticleIdService(comment_id);
    return response.status(204).send();
  } catch (error) {
    next(error);
  }
};
