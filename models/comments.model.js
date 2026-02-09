const db = require("../db/connection");

exports.fetchCommentById = (comment_id) => {
  return db
    .query(
      `
    SELECT * FROM comments
    WHERE comment_id = $1;
    `,
      [comment_id],
    )
    .then((comment) => {
      return comment.rows;
    });
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `
        SELECT * FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC
      `,
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

exports.fetchCommentsByArticleIdDelete = (comment_id) => {
  return db.query(
    `
    DELETE FROM comments
    WHERE comment_id = $1;
    `,
    [comment_id],
  );
};
