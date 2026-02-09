const db = require("../db/connection");
exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `
        SELECT * FROM comments
        WHERE article_id = $1
        ORDER by created_at desc`,
      [article_id],
    )
    .then((article) => {
      return article.rows;
    });
};

exports.fetchCommentsByArticleIdPost = (article_id, author, body) => {
  return db
    .query(
      `
    INSERT INTO comments (article_id, body, author)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
      [article_id, body, author],
    )
    .then((comments) => {
      return comments.rows[0];
    });
};
