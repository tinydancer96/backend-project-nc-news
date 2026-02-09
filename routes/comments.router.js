const express = require("express");
const router = express.Router();

const {
  deleteCommentByArticleId,
  getCommentsByCommentId,
} = require("../controllers/comments.controller");

router.get("/:comment_id", getCommentsByCommentId);
router.delete("/:comment_id", deleteCommentByArticleId);

module.exports = { router };
