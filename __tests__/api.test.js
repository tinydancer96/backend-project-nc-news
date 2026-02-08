const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("GET /api/topics/", () => {
  test("GET: 200 - returns topics with correct columns", () => {
    return request(app)
      .get("/api/topics/")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(typeof topics[0].slug).toBe("string");
        expect(typeof topics[0].description).toBe("string");
      });
  });
});

describe("GET /api/users/", () => {
  test("GET: 200 - returns users with correct columns", () => {
    return request(app)
      .get("/api/users/")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        // console.log(typeof users[0]);
        expect(typeof users[0].username).toBe("string");
        expect(typeof users[0].name).toBe("string");
        expect(typeof users[0].avatar_url).toBe("string");
      });
  });
});

describe("GET /api/articles/", () => {
  test("GET: 200 - returns aticles with correct columns", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        // console.log(typeof articles[0].topic);
        expect(typeof articles[0].author).toBe("string");
        expect(typeof articles[0].title).toBe("string");
        expect(typeof articles[0].article_id).toBe("number");
        expect(typeof articles[0].topic).toBe("string");
        expect(typeof articles[0].created_at).toBe("string");
        expect(typeof articles[0].votes).toBe("number");
        expect(typeof articles[0].article_img_url).toBe("string");
        expect(typeof articles[0].comment_count).toBe("number");
      });
  });
});

describe("GET /api/articles/3", () => {
  test("GET: 200 - returns article of article_id 3 with correct columns", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(typeof article[0].author).toBe("string");
        expect(typeof article[0].title).toBe("string");
        expect(article[0].article_id).toBe(3);
        expect(typeof article[0].topic).toBe("string");
        expect(typeof article[0].created_at).toBe("string");
        expect(typeof article[0].votes).toBe("number");
        expect(typeof article[0].article_img_url).toBe("string");
        expect(typeof article[0].comment_count).toBe("number");
      });
  });

  test("GET: 200 - returns a single article", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.length).toBe(1);
      });
  });
});

describe("GET /api/articles/3", () => {
  test("GET: 200 - returns article with correct columns", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(typeof comments[0].comment_id).toBe("number");
        expect(typeof comments[0].votes).toBe("number");
        expect(typeof comments[0].created_at).toBe("string");
        expect(typeof comments[0].author).toBe("string");
        expect(typeof comments[0].body).toBe("string");
        expect(typeof comments[0].article_id).toBe("number");
      });
  });
  test("GET: 200 - returns article of article_id 3", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments[0].article_id).toBe(3);
      });
  });
});
