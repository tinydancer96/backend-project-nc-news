const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.router");

app.use(express.json());

app.use("/api/topics", topicsRouter);

module.exports = app;
