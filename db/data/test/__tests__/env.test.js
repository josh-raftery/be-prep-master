const app = require("../app.js");
const data = require("../db/data/test-data");
const { connectToDatabase, closeConnection } = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");

beforeAll(async () => {
  await seed(data);
});

afterAll(async () => {
  await closeConnection();
});

test('', () => {
    
    console.log(ENV)
})