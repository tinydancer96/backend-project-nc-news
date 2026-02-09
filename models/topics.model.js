const db = require("../db/connection");

exports.fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then((topics) => {
    return topics.rows;
  });
};

exports.fetchTopicsBySlug = (slug) => {
  return db
    .query(
      `
      SELECT * FROM topics
      WHERE topics.slug = $1
    `,
      [slug],
    )
    .then((topic) => {
      return topic.rows;
    });
};
