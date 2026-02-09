const express = require("express");
const app = express();
const { router: topicsRouter } = require("./routes/topics.router");
const { router: articlesRouter } = require("./routes/articles.router");
const { router: usersRouter } = require("./routes/users.router");
const NotFoundError = require("./myErrorTypes/notFound");
const InvalidInputError = require("./myErrorTypes/invalidInput");

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.use((request, response, next) => {
  const error = new NotFoundError("Route not found", "Location: app.js");
  next(error);
});

// ERROR HANDLING FOR IF ROUTE DOES NOT EXISTS
app.use((error, request, response, next) => {
  if (error instanceof NotFoundError) {
    console.log(error.location);
    response.status(error.status).send({ msg: error.message });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  if (error instanceof InvalidInputError) {
    console.log(error.location);
    response.status(error.status).send({ msg: error.message });
  } else {
    next(error);
  }
});

// ERROR TO CATCH ALL UNACCOUNTED ERRORS
app.use((error, request, response, next) => {
  console.log(`Logging error: ${error}`);
  response.status(500).send({ msg: `Internal server error` });
});

module.exports = app;
