const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
} = require("../controllers/articles.controller");
const {
  getCommentsByArticleId,
  postCommentbyArticleId,
} = require("../controllers/comments.controller");

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.get("/:article_id/comments", getCommentsByArticleId);
router.post("/:article_id/comments", postCommentbyArticleId);

module.exports = { router };
