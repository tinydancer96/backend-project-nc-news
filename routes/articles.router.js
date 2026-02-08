const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
} = require("../controllers/articles.controller");
const {
  getCommentsByArticleId,
} = require("../controllers/comments.controller");

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.get("/:article_id/comments", getCommentsByArticleId);

module.exports = { router };
