const db = require("../db/connection");

exports.fetchAllTopics = async () => {
  const query = await db.query(`SELECT * FROM topics`);
  return query.rows;
};

exports.fetchTopicsBySlug = async (slug) => {
  const query = await db.query(
    `
      SELECT * FROM topics
      WHERE topics.slug = $1
    `,
    [slug],
  );
  return query.rows;
};
