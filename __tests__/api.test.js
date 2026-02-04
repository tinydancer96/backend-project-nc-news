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
        console.log(topics);
        expect(typeof topics[0].slug).toBe("string");
        expect(typeof topics[0].description).toBe("string");
      });
  });
});
