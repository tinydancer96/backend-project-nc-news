const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics.router");
const articlesRouter = require("./routes/articles.router");
const usersRouter = require("./routes/users.router");

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

// ERROR HANDLING FOR IF ROUTE DOES NOT EXISTS
app.use((request, response, next) => {
  if (err instanceof Error) {
    response.status(404).send({ msg: "Error: route not found" });
  }
});

// ERROR TO CATCH ALL UNACCOUNTED ERRORS
app.use((error, request, response, next) => {
  response.status(500).send({ msg: error });
});

module.exports = app;
