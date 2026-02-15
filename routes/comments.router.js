const express = require("express");
const router = express.Router();

const {
  deleteCommentByArticleId,
  getCommentsByCommentId,
} = require("../controllers/comments.controller");

router
  .route("/:comment_id")
  .get(getCommentsByCommentId)
  .delete(deleteCommentByArticleId);

module.exports = { router };
