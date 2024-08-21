const mongoose = require("mongoose");
const seedDB = require("../db/seed/seed");
const recipeData = require("../db/data/test/recipeTestData.json");
const ingredientsData = require("../db/data/test/ingredientsTestData.json");
const userData = require("../db/data/test/userTestData.json");
const mealPlanData = require("../db/data/test/mealPlanData.json");
// const app = require("../app");
const request = require("supertest");
const { default: axios } = require("axios");
const clientPromise = require("../connection");


const host = process.env.HOST || 'localhost'; 
const port = process.env.PORT || 3000;   
const baseUrl = `http://${host}:${port}/api`

const api = axios.create({
  baseURL: baseUrl,
});

beforeAll(async () => {
  await seedDB({ recipeData, ingredientsData, userData, mealPlanData });
});

afterAll(async () => {
  const client = await clientPromise
  await client.close();
});

describe("Wrong endpoint tests", () => {
  test("404: error when path does not exist", () => {
    return api.get('/incorrect-path')
    .catch((err) => {
      expect(err.message).toBe('Request failed with status code 404')
      expect(err.response.status).toBe(404)
    })
  });
});

describe("GET /api/getRecipe tests", () => {
  test("should return all recipes", () => {
    return api.get(`/recipes`)
    .then((response) => {
      expect(response.status).toBe(200)
      expect(response.data.recipes.length).toBe(5)
    })
  });
});

describe("GET /api/recipes/:_id:", () => {
  test("should fetch a recipe by ID", () => {
    return api.get('/recipes/1')
    .then(response => {
        expect(response.status).toBe(200)
        expect(response.data.recipe.recipe_id).toEqual(1)
    })

  });
  test("404: error for a non-existent recipe ID", () => {
    return api.get("/recipes/999")
    .catch((err) => {
      expect(err.message).toBe('Request failed with status code 404')
      expect(err.response.status).toBe(404)
    })
  });
});


describe('GET api/users', () => {
  test('should fetch the users data', () => {
    return api.get("/users")
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.users.length).toEqual(5)
  })
  });
});

describe('Get api/users/1', () => {
  test('should fetch the user by id', () => {
    return api.get('/users/1')
    .then(response => {
        expect(response.status).toBe(200)
        expect(response.data.user.user_id).toEqual(1)
    })
  });
  test("404: error for a non-existent user ID", () => {
    return api.get("/users/999")
    .then((response) => {
      expect(response.status).toBe(404)
      expect(response.error).toBe('Not Found')
    })
    .catch((err) => {
      expect(err.message).toBe('Request failed with status code 404')
      expect(err.response.status).toBe(404)
    })
  });
});

