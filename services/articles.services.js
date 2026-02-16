const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleVotesById,
  fetchArticlePost,
} = require("../models/articles.model");

const { fetchTopicsBySlug } = require("../models/topics.model");

const { fetchUserById } = require("../models/users.model");

const NotFoundError = require("../myErrorTypes/notFound");
const InvalidInputError = require("../myErrorTypes/invalidInput");

exports.getAllArticles = async (query) => {
  // sets default values
  let orderByColumn = "articles.created_at";
  let sortBy = "desc";
  let topicSearch = "";
  let limit = 2;
  let startingPage = 1;

  if (Object.keys(query).length !== 0) {
    // Filter by topic functionality

    // checks if query is topics query?
    const topicValue = query.topic;
    if (topicValue !== undefined) {
      const topicFetch = await fetchTopicsBySlug(topicValue);
      if (topicFetch.length === 0) {
        throw new NotFoundError(
          "Topic not found",
          "Location: articles.service.js",
        );
      } else {
        topicSearch = topicValue;
      }
    }

    // Sort by functionality

    // validate query input for sort by functionality
    const validSortedColumns = {
      author: "articles.author",
      title: "articles.title",
      topic: "article.topic",
    };

    // checks if it is an author or title query and reassigns orderByColumn and sortBy variables

    if (query.author !== undefined) {
      orderByColumn = validSortedColumns.author;
      sortBy = query.author;
    }

    if (query.title !== undefined) {
      orderByColumn = validSortedColumns.title;
      sortBy = query.title;
    }
  }
  const fetchedResults = await fetchAllArticles(
    orderByColumn,
    sortBy,
    topicSearch,
  );

  // pagination logic

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

  for (let i = limit * startingPage - limit; i < limit * startingPage; i++) {
    paginatedResults.push(fetchedResults[i]);
  }

  return paginatedResults;
};

exports.getArticleById = async (article_id) => {
  if (isNaN(Number(article_id))) {
    throw new InvalidInputError(
      "Please provide valid article_id",
      "Location: articles.services.js",
    );
  }

  const article = fetchArticleById(article_id);
  if (article.length === 0) {
    throw new NotFoundError(
      "This article id does not exist",
      "Location: articles.services.js",
    );
  } else {
    return article;
  }
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

exports.postArticle = async (author, title, body, topic, article_img_url) => {
  // does author exist in authors table
  const authorExist = await fetchUserById(author);
  if (author.length === 0) {
    throw new InvalidInputError(
      "Author is empty.",
      "Location: articles service",
    );
  }

  if (authorExist.length === 0) {
    throw new NotFoundError(
      "Author does not exist.",
      "Location: articles service",
    );
  }

  // is title empty

  if (title.length === 0) {
    throw new InvalidInputError(
      "Title is empty. Please provide a title before publishing",
      "Location: articles service",
    );
  }

  // is body empty

  if (body.length === 0) {
    throw new InvalidInputError(
      "Body is empty. Please provide a body before publishing",
      "Location: articles service",
    );
  }

  // is topic empty/exists

  const topicExist = await fetchTopicsBySlug(topic);
  if (topic.length === 0) {
    throw new InvalidInputError(
      "Topic is empty. Please provide a topic before publishing",
      "Location: articles service",
    );
  }

  if (topicExist.length === 0) {
    throw new NotFoundError(
      "Topic does not exist.",
      "Location: articles service",
    );
  }

  // is article_img_url empty

  if (article_img_url.length === 0) {
    article_img_url =
      "https://unsplash.com/photos/three-crumpled-yellow-papers-on-green-surface-surrounded-by-yellow-lined-papers-V5vqWC9gyEU";
  }

  return fetchArticlePost(author, title, body, topic, article_img_url);
};
