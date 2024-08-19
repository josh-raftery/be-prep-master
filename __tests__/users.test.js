const mongoose = require("mongoose");
const seedDB = require("../db/seed/seed");
const recipeData = require("../db/data/test/recipeWithIDSample.json");
const ingredientsData = require("../db/data/test/dev/ingredientsData.json");
const userData = require("../db/data/test/userTestData.json");
const request = require("supertest");
const recipeSchema = require("../models/recipeSchema");
const ingredientsSchema = require("../models/ingredientsListSchema");
const usersSchema = require("../models/usersSchema");

beforeAll(async () => {
  await seedDB({ recipeData, ingredientsData, userData });
});

afterAll(async () => {
  mongoose.connection.close();
});
describe("/api/users", () => {
  test("GET:200 endpoint responds with an array of all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
