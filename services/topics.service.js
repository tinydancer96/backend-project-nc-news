const { fetchAllTopics, fetchTopicsBySlug } = require("../models/topics.model");
const NotFoundError = require("../myErrorTypes/notFound");

exports.getAllTopics = () => {
  return fetchAllTopics();
};

exports.getTopicBySlug = (slug) => {
  return fetchTopicsBySlug(slug).then((topic) => {
    if (topic.length === 0) {
      throw new NotFoundError("Topic not found", "Location: topic.service.js");
    }
    return topic;
  });
};
