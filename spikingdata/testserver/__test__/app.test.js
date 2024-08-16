const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const { db } = require("../model/recipeModel");
const { default: test } = require("node:test");

let mongoServer;

beforeAll((done) => {
  done();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('Returns a 404 when requesting a path that does not exist', () => {
  it('404: When path does not exist', () => {
    return request(app)
      .get("/api/incorrect-path")
      .expect(404)
  });
});

describe("GET /api/recipe", () => {
  it("should fetch all recipes", () => {
    request(app)
      .get("/api/getRecipe")
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
})


describe('GET /api/recipe/:recipe_id:', () => {
  it("should fetch a recipe by ID", () => {
    const newRecipe = {
      recipe_id: 1,
      chef: "Chef Test",
      chef_id: "chef-test-id",
      cooking_time_minutes: 30,
      description: "A test recipe",
      ingredients: ["ingredient1", "ingredient2"],
      instructions: ["step1", "step2"],
      instructions_detailed: [{ ingredient: "ingredient1", line: "step1" }],
      photo_url: "http://example.com/photo.jpg",
      preparation_time_minutes: 10,
      program: "Test Program",
      program_id: "program-test-id",
      serves: 4,
      time_scraped: 0,
      title: "Test Recipe",
      total_time_minutes: 40,
      url: "http://example.com",
      kcal: 500,
      protein: 20,
      fat: 10,
      salt: 5,
      carbohydrate: 60,
      sugar: 20,
      fibre: 5,
    };

    request(app)
      .post("/api/getRecipe")
      .send(newRecipe)
      .end(() => {
        request(app)
          .get("/api/getRecipe/1")
          .expect(200)
          .expect((res) => {
            expect(res.body.recipe_id).toBe(newRecipe.recipe_id);
          });
      });
  });

  it("should return 404 for a non-existent recipe ID", (done) => {
    request(app).get("/api/getRecipe/999").expect(404).end(done);
  });
})
  
