const NotFoundError = require("../myErrorTypes/notFound");
const InvalidInputError = require("../myErrorTypes/invalidInput");

exports.pagination = (query, limit, startingPage, fetchedResults) => {
  if (query.limit !== undefined) {
    if (typeof Number(query.limit) !== "number" || isNaN(Number(query.limit))) {
      throw new InvalidInputError(
        "Please provide a valid limit number",
        "Location: articles service",
      );
    } else {
      limit = query.limit;
    }
  }

  if (query.p !== undefined) {
    if (typeof Number(query.p) !== "number" || isNaN(Number(query.p))) {
      throw new InvalidInputError(
        "Please provide a valid page number",
        "Location: articles service",
      );
    } else {
      startingPage = query.p;
    }
  }
  let paginatedResults = [];

  // calculating pagination
  for (let i = limit * startingPage - limit; i < limit * startingPage; i++) {
    paginatedResults.push(fetchedResults[i]);
  }

  const numberOfItems = fetchedResults.length;
  const numberOfPages = Math.ceil(numberOfItems / limit);

  // check if queried a page beyond the limit
  if (query.p > numberOfPages) {
    throw new NotFoundError("No articles found", "Location: articles.service");
  }

  // check if queried a page beyond the limit
  if (query.p > numberOfPages) {
    throw new NotFoundError("No articles found", "Location: articles.service");
  }

  return {
    paginatedResults: paginatedResults,
    articleCount: numberOfItems,
    currentPage: startingPage,
    pageCount: numberOfPages,
  };
};
