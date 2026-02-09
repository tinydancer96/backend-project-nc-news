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
router.get("/:article_id", getArticleById);
router.get("/:article_id/comments", getCommentsByArticleId);
router.post("/:article_id/comments", postCommentbyArticleId);
router.patch("/:article_id", patchVoteByArticleId);

module.exports = { router };
