const express = require("express");
const router = express.Router();
const { getAllTopics } = require("../controllers/topics.controller");

router.get("/", getAllTopics);
module.exports = router;
