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

describe("GET /api/topics/:slug", () => {
  test("GET: 200 - returns valid", () => {
    return request(app)
      .get("/api/topics/mitch")
      .expect(200)
      .then(({ body }) => {
        const { topic } = body;
        expect(topic[0].slug).toBe("mitch");
        expect(typeof topic[0].description).toBe("string");
      });
  });

  test("GET: 200 - errors when invalid topic", () => {
    return request(app)
      .get("/api/topics/iaeilfar*()(75")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Topic not found");
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

describe("GET /api/articles/3/comments", () => {
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
const validNewComment = {
  author: "butter_bridge",
  body: "new comment for article 7",
};

describe("POST comment for an article", () => {
  test("POST 201: responds with a single object for valid comment", () => {
    return request(app)
      .post("/api/articles/7/comments")
      .send(validNewComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(typeof comment).toBe("object");
        expect(comment.body).toBe(validNewComment.body);
        expect(comment.author).toBe(validNewComment.author);
        expect(comment.article_id).toBe(7);
      });
  });

  test("POST 404: nonexistent user should ", () => {
    return request(app)
      .post("/api/articles/7/comments")
      .send({ author: "nonexistent_user", body: "test" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("This user does not exist");
      });
  });

  test("POST 404: nonexistent article should", () => {
    return request(app)
      .post("/api/articles/999/comments")
      .send(validNewComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("This article id does not exist");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH 200: increments the votes by the given amount", () => {
    const voteUpdate = { inc_votes: 5 };
    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.article_id).toBe(1);
        expect(typeof article.votes).toBe("number");
        // Assuming seed has 100 votes initially
        expect(article.votes).toBeGreaterThanOrEqual(5);
      });
  });

  test("PATCH 200 decrements the votes by the given amount", () => {
    const voteUpdate = { inc_votes: -10 };
    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.article_id).toBe(1);
        expect(typeof article.votes).toBe("number");
      });
  });

  test("PATCH 400: returns error for invalid inc_votes type", () => {
    const invalidVote = { inc_votes: "five" };
    return request(app)
      .patch("/api/articles/1")
      .send(invalidVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("inc_votes must be a number");
      });
  });

  test("PATCH 400: returns error for missing inc_votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("inc_votes must be a number");
      });
  });

  test("PATCH 404: returns error for nonexistent article", () => {
    const voteUpdate = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/9999")
      .send(voteUpdate)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("This article id does not exist");
      });
  });

  test("400 - returns error for invalid article_id format", () => {
    const voteUpdate = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/not-a-number")
      .send(voteUpdate)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Please provide valid article_id");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("DELETE 204: deletes existing comment", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });

  test("Confirms deletion of comment 1", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment does not exist. Cannot delete");
      });
  });

  test("DELETE 404: does not delete non-existing comment", () => {
    return request(app)
      .delete("/api/comments/9000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment does not exist. Cannot delete");
      });
  });

  test("DELETE 404: does not delete when non-number comment_id provided", () => {
    return request(app)
      .delete("/api/comments/hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid comment_id. Please provide a number");
      });
  });
});

describe("POST /api/articles", () => {
  test("error if author is blank", () => {
    return request(app)
      .post("/api/articles")
      .send({
        author: "",
        title: "New article to publish",
        topic: "mitch",
        body: "This is a new article from butter_bridge!",
        article_img_url: "",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Author is empty.");
      });
  });

  test("error if author does not exist on user table", () => {
    return request(app)
      .post("/api/articles")
      .send({
        author: "invalidUser",
        title: "New article to publish",
        topic: "mitch",
        body: "This is a new article from butter_bridge!",
        article_img_url: "",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Author does not exist.");
      });
  });

  test("error if title is blank", () => {
    return request(app)
      .post("/api/articles")
      .send({
        author: "butter_bridge",
        title: "",
        topic: "mitch",
        body: "This is a new article from butter_bridge!",
        article_img_url: "",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Title is empty. Please provide a title before publishing",
        );
      });
  });

  test("error if body is blank", () => {
    return request(app)
      .post("/api/articles")
      .send({
        author: "butter_bridge",
        title: "New article from butter_bridge",
        topic: "mitch",
        body: "",
        article_img_url: "",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Body is empty. Please provide a body before publishing",
        );
      });
  });

  test("error if topic is blank", () => {
    return request(app)
      .post("/api/articles")
      .send({
        author: "butter_bridge",
        title: "New article to publish",
        topic: "",
        body: "This is a new article from butter_bridge!",
        article_img_url: "",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Topic is empty. Please provide a topic before publishing",
        );
      });
  });

  test("error if topic does not exist on topic table", () => {
    return request(app)
      .post("/api/articles")
      .send({
        author: "butter_bridge",
        title: "New article to publish",
        topic: "invalidTopic",
        body: "This is a new article from butter_bridge!",
        article_img_url: "",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Topic does not exist.");
      });
  });

  test("retrieves article posted if valid", () => {
    return request(app)
      .post("/api/articles")
      .send({
        author: "butter_bridge",
        title: "New article to publish",
        topic: "mitch",
        body: "This is a new article from butter_bridge!",
        article_img_url: "",
      })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(typeof article[0].author).toBe("string");
        expect(typeof article[0].title).toBe("string");
        expect(typeof article[0].topic).toBe("string");
        expect(typeof article[0].body).toBe("string");
        expect(typeof article[0].article_img_url).toBe("string");
        expect(typeof article[0].created_at).toBe("string");
        expect(typeof article[0].votes).toBe("number");
        expect(typeof article[0].comment_count).toBe("number");
      });
  });
});
