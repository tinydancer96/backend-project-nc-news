const db = require("../db/connection");
const format = require("pg-format");

async function allUsersQuery() {
  const query = await db.query(`
    SELECT * FROM users`);

  return query.rows;
}
// allUsersQuery();

async function topicsCoding() {
  const query = await db.query(`
    SELECT * FROM articles
    WHERE topic = 'coding';
    `);
  console.log(query.rows);
}

// topicsCoding();

async function zeroComments() {
  const query = await db.query(`
        SELECT * FROM articles
        WHERE votes = 0;
        `);

  console.log(query.rows);
}

// zeroComments();

async function allTopics() {
  const query = await db.query(`
        SELECT slug FROM topics;`);

  return query.rows;
}

// allTopics();

async function grump19Articles() {
  const query = await db.query(`
        SELECT * FROM articles
        WHERE author = 'grumpy19';
        `);
  return query.rows;
}

// grump19Articles();

async function commentsWithTenVotes() {
  const query = await db.query(`
        SELECT * FROM comments
        WHERE votes > 10;
    `);

  console.log(query.rows);
}

commentsWithTenVotes();
