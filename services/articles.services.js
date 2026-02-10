const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleVotesById,
} = require("../models/articles.model");

const { fetchTopicsBySlug } = require("../models/topics.model");

const NotFoundError = require("../myErrorTypes/notFound");
const InvalidInputError = require("../myErrorTypes/invalidInput");

exports.getAllArticles = async (query) => {
  // sets default values
  let orderByColumn = "articles.created_at";
  let sortBy = "desc";
  let topicSearch = "";

  if (Object.keys(query).length !== 0) {
    const [[key, value]] = Object.entries(query);
    // Filter by topic functionality

    // checks if query is topics query?
    if (key === "topic") {
      fetchTopicsBySlug(value).then((topics) => {
        if (topics.length === 0) {
          throw new NotFoundError(
            "Topic not found",
            "Location: articles.service.js",
          );
        } else {
          topicSearch = value;
        }
      });
    }

    // Sort by functionality

    // validate query input for sort by functionality
    const validSortedColumns = {
      author: "articles.author",
      title: "articles.title",
      topic: "article.topic",
    };
    const order = ["asc", "desc"];

    if (Object.keys(query).length !== 0) {
      // checks if query is a topic query
      if (key === "topic") {
        const topic = await fetchTopicsBySlug(value);
        if (topic.length === 0) {
          throw new NotFoundError(
            "Topic not found",
            "Location: articles.service.js",
          );
        } else {
          topicSearch = value;
        }

        // checks if it is an author or title query
      } else if (
        Object.keys(validSortedColumns).includes(key) &&
        order.includes(value)
      ) {
        orderByColumn = validSortedColumns[key];
        sortBy = value.toUpperCase();
        // if not title, author or topic throw an error
      } else {
        throw new InvalidInputError(
          "Invalid sort by column or order. Please sort by author, title or topic and order by asc or desc",
          "Location: articles.service.js",
        );
      }
    }
  }

  return fetchAllArticles(orderByColumn, sortBy, topicSearch);
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
