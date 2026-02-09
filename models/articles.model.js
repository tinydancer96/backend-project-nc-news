const db = require("../db/connection");

exports.fetchAllArticles = (orderByColumn, sortBy) => {
  return db
    .query(
      `
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
    GROUP BY articles.article_id
    ORDER BY ${orderByColumn} ${sortBy};
        `,
    )
    .then((articles) => {
      return articles.rows;
    });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `
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
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`,
      [article_id],
    )
    .then((article) => {
      return article.rows;
    });
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
