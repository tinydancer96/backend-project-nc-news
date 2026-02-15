const {
  fetchCommentById,
  fetchCommentsByArticleIdPost,
  fetchCommentsByArticleId,
  fetchCommentsByArticleIdDelete,
} = require("../models/comments.model");

const { fetchUserById } = require("../models/users.model");
const { fetchArticleById } = require("../models/articles.model");
const InvalidInputError = require("../myErrorTypes/invalidInput");
const NotFoundError = require("../myErrorTypes/notFound");

exports.getCommentsByCommentId = async (comment_id) => {
  const comment = await fetchCommentById(comment_id);
  if (comment.length === 0) {
    throw new NotFoundError(
      "Comment does not exist",
      "Location: comments.service.js",
    );
  }
  return fetchCommentById(comment_id);
};

exports.getCommentsByArticleId = async (article_id) => {
  if (isNaN(Number(article_id))) {
    throw new InvalidInputError(
      "Please provide a valid article_id",
      "Location: comments.service.js",
    );
  }

  const article = await fetchArticleById(article_id);
  if (article.length === 0) {
    throw new NotFoundError(
      "This article id does not exist",
      "Location: articles.services.js",
    );
  }

  const comments = await fetchCommentsByArticleId(article_id);
  if (comments.length === 0) {
    return "There are no comments for this article";
  } else {
    return comments;
  }
};

exports.postCommentbyArticleId = async (article_id, author, body) => {
  // Check article exists
  const article = await fetchArticleById(article_id);
  if (article.length === 0) {
    throw new NotFoundError(
      "This article id does not exist",
      "Location: comments.services.js",
    );
  }

  // Check user exists
  const user = await fetchUserById(author);
  if (user.length === 0) {
    throw new NotFoundError(
      "This user does not exist",
      "Location: comments.services.js",
    );
  }

  return fetchCommentsByArticleIdPost(article_id, author, body);
};

exports.deleteCommentByArticleId = async (comment_id) => {
  if (isNaN(Number(comment_id))) {
    throw new InvalidInputError(
      "Invalid comment_id. Please provide a number",
      "Location: comments.service.js",
    );
  }

  const comment = await fetchCommentById(comment_id);
  if (comment.length === 0) {
    throw new NotFoundError(
      "Comment does not exist. Cannot delete",
      "Location: comments.service.js",
    );
  }

  return fetchCommentsByArticleIdDelete(comment_id);
};
