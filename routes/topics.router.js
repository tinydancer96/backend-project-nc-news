const express = require("express");
const router = express.Router();
const {
  getAllTopics,
  getTopicBySlug,
} = require("../controllers/topics.controller");

router.get("/", getAllTopics);
router.get("/:slug", getTopicBySlug);

module.exports = { router };
