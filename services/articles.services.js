const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleVotesById,
} = require("../models/articles.model");

const { fetchAllTopics } = require("../models/topics.model");

const NotFoundError = require("../myErrorTypes/notFound");
const InvalidInputError = require("../myErrorTypes/invalidInput");

exports.getAllArticles = (query) => {
  // Sort by column functionality

  // validate query input
  const validSortedColumns = {
    author: "articles.author",
    title: "articles.title",
    topics: "articles.topics",
  };
  const order = ["asc", "desc"];

  // sets default values
  let orderByColumn = "articles.created_at";
  let sortBy = "desc";

  if (Object.keys(query).length !== 0) {
    const [[key, value]] = Object.entries(query);
    // Filter by topics functionality
    if (key === topics) {
      // validate topic exists
      console.log("*");
    }
    if (
      Object.keys(validSortedColumns).includes(key) &&
      order.includes(value)
    ) {
      orderByColumn = validSortedColumns[key];
      sortBy = value;
    } else {
      throw new InvalidInputError(
        "Invalid sort by column or order. Please sort by author, title or topic and order by asc or desc",
        "Location: articles.service.js",
      );
    }
  }

  return fetchAllArticles(orderByColumn, sortBy.toUpperCase());
};

exports.getArticleById = (article_id) => {
  if (isNaN(Number(article_id))) {
    throw new InvalidInputError(
      "Please provide valid article_id",
      "Location: articles.services.js",
    );
  }

  return fetchArticleById(article_id).then((article) => {
    if (article.length === 0) {
      throw new NotFoundError(
        "This article id does not exist",
        "Location: articles.services.js",
      );
    } else {
      return article;
    }
  });
};

exports.patchVoteByArticleId = async (article_id, inc_votes) => {
  if (isNaN(Number(article_id))) {
    throw new InvalidInputError(
      "Please provide valid article_id",
      "Location: articles.services.js",
    );
  }
  if (typeof inc_votes !== "number") {
    throw new InvalidInputError(
      "inc_votes must be a number",
      "Location: articles.services.js",
    );
  }

  const article = await fetchArticleById(article_id);
  if (article.length === 0) {
    throw new NotFoundError(
      "This article id does not exist",
      "Location: articles.services.js",
    );
  }

  return updateArticleVotesById(article_id, inc_votes);
};
