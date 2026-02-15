const express = require("express");
const router = express.Router();

// Articles
const {
  getAllArticles,
  getArticleById,
  patchVoteByArticleId,
} = require("../controllers/articles.controller");

// Comments
const {
  getCommentsByArticleId,
  postCommentbyArticleId,
} = require("../controllers/comments.controller");

router.get("/", getAllArticles);

router.route("/:article_id").get(getArticleById).patch(patchVoteByArticleId);

router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentbyArticleId);

module.exports = { router };
