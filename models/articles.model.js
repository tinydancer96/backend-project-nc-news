const db = require("../db/connection");

exports.fetchAllArticles = async (orderByColumn, sortBy, topicSearch) => {
  let queryStr = `
      SELECT
         articles.author,
         articles.title,
         articles.article_id,
         articles.topic,
         articles.created_at,
         articles.votes,
         articles.article_img_url,
     CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
     FROM articles
     LEFT JOIN comments ON articles.article_id = comments.article_id
     `;
  let groupAndSortStr = `
     GROUP BY articles.article_id
     ORDER BY `;

  // let queryParams = [topicSearch, orderByColumn, sortBy];
  let queryParams = [];

  if (topicSearch !== "") {
    queryStr += ` WHERE articles.topic = $1`;
    queryParams.push(topicSearch);
  }
  groupAndSortStr += `${orderByColumn} ${sortBy}`;
  const query = await db.query(queryStr + groupAndSortStr, queryParams);
  return query.rows;
};

exports.fetchArticleById = async (article_id) => {
  const query = await db.query(
    `
      SELECT articles.body FROM articles
      WHERE articles.article_id = $1`,
    [article_id],
  );
  return query.rows;
};

exports.updateArticleVotesById = (article_id, inc_votes) => {
  return db
    .query(
      `
    UPDATE articles
    SET votes = votes + $1                                         
    WHERE article_id = $2
    RETURNING 
        author,
        title,
        article_id,
        topic,
        created_at,
        votes,
        article_img_url;
    `,
      [inc_votes, article_id],
    )
    .then((res) => res.rows[0]);
};

exports.fetchArticlePost = async (
  author,
  title,
  body,
  topic,
  article_img_url,
) => {
  const query = await db.query(
    `
    INSERT INTO articles (title, topic, author, body, article_img_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [title, topic, author, body, article_img_url],
  );

  const article_id = query.rows[0].article_id;

  const returnQuery = await db.query(
    `
      SELECT 
          articles.author,
          articles.title,
          articles.body,
          articles.article_id,
          articles.topic,
          articles.created_at,
          articles.votes,
          articles.article_img_url,
      CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;
    `,
    [article_id],
  );

  return returnQuery.rows;
};
