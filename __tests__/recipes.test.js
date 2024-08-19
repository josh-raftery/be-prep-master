const mongoose = require("mongoose");
const seedDB = require("../db/seed/seed");
const recipeData = require("../db/data/test/recipeWithIDSample.json");
const ingredientsData = require("../db/data/test/dev/ingredientsData.json");
const userData = require("../db/data/test/userTestData.json");
const app = require("../app");
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

describe("Wrong endpoint tests", () => {
  test("404: error when path does not exist", () => {
    return request(app).get("/api/incorrect-path").expect(404);
  });
});

describe("GET /api/getRecipe tests", () => {
  test("should return all recipes", () => {
    return request(app)
      .get("/api/recipes")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(5);
      });
  });
});

// problem with mongoDB automatically created ObjectID, it changes everytime we re-seed the databases. This test will fail until we can create a dynamic ID
describe("GET /api/recipes/:_id:", () => {
  test("should fetch a recipe by ID", () => {
    return request(app)
      .get("/api/recipe/66c06cfab978c962379cf30d")
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body.title).toBe(
          "Apple, rocket and feta buckwheat galettes"
        );
      });
  });
  test("404: error for a non-existent recipe ID", () => {
    return request(app).get("/api/recipe/999").expect(404);
  });
});
