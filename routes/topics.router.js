const express = require("express");
const router = express.Router();
const {
  getAllTopics,
  getTopicBySlug,
  postTopic,
} = require("../controllers/topics.controller");

router.route("/").get(getAllTopics);
router.get("/:slug", getTopicBySlug);

module.exports = { router };
