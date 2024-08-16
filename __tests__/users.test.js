// const seedDB = require("db/seed/seed.js");
const { default: mongoose } = require("mongoose");
const seedDB = require("../db/seed/seed");
const recipeData = require('../db/data/test/recipeWithIDSample.json')
const ingredientsData = require('../db/data/test/dev/ingredientsData.json')
const userData = require('../db/data/test/userTestData.json')
const request = require("supertest");

beforeAll(async () => {
  await seedDB({recipeData,ingredientsData,userData})
});

afterAll(async () => {
    mongoose.connection.close();
});
describe('/api/users', () => {
    test('GET:200 endpoint responds with an array of all users', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
    })
})
