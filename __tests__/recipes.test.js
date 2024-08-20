const mongoose = require("mongoose");
const seedDB = require("../db/seed/seed");
const recipeData = require("../db/data/test/recipeTestData.json");
const ingredientsData = require("../db/data/test/ingredientsTestData.json");
const userData = require("../db/data/test/userTestData.json");
// const app = require("../app");
const request = require("supertest");
const { default: axios } = require("axios");

const host = process.env.HOST || 'localhost'; 
const port = process.env.PORT || 3000;   
const baseUrl = `http://${host}:${port}/api`

const api = axios.create({
  baseURL: baseUrl,
});

beforeAll(async () => {
  await seedDB({ recipeData, ingredientsData, userData });
});

afterAll(async () => {
  mongoose.connection.close();
});

describe("Wrong endpoint tests", () => {
  test("404: error when path does not exist", () => {
    return api.get('/incorrect-path')
    .catch((err) => {
      expect(err.message).toBe('Request failed with status code 404')
    })
  });
});

describe("GET /api/getRecipe tests", () => {
  test.only("should return all recipes", () => {
    return api.get(`/recipes`)
    .then((response) => {
      expect(response.status).toBe(200)
      expect(response.data).toHaveLength(5)
    })
    .catch((err) => {
      console.log(err, ' ERR <---------')
    })
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
