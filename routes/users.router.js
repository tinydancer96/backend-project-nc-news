const express = require("express");
const router = express.Router();
const { getAllUsers, userbyId } = require("../controllers/users.controller");

router.get("/", getAllUsers);
router.get("/:username", userbyId);

module.exports = { router };
