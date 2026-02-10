const db = require("../db/connection");

exports.fetchCommentById = async (comment_id) => {
  const query = await db.query(
    `
      SELECT * FROM comments
      WHERE comment_id = $1;
      `,
    [comment_id],
  );

  return query.rows;
};

exports.fetchCommentsByArticleId = async (article_id) => {
  const query = await db.query(
    `
        SELECT * FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC
      `,
    [article_id],
  );

  return query.rows;
};

exports.fetchCommentsByArticleIdPost = async (article_id, author, body) => {
  const query = await db.query(
    `
        INSERT INTO comments (article_id, body, author)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
    [article_id, body, author],
  );
  return query.rows[0];
};

exports.fetchCommentsByArticleIdDelete = async (comment_id) => {
  const query = await db.query(
    `
    DELETE FROM comments
    WHERE comment_id = $1;
    `,
    [comment_id],
  );
};
