// const seedDB = require("db/seed/seed.js");
const { default: mongoose } = require("mongoose");
const seedDB = require("../db/seed/seed");
 const recipeData = require('../db/data/test/recipeWithIDSample.json')
 const ingredientsData = require('../db/data/test/dev/ingredientsData.json')
 const userData = require('../db/data/test/userTestData.json')

beforeAll(async () => {
  await seedDB({recipeData,ingredientsData,userData})
});

afterAll(async () => {
    mongoose.connection.close();
});

test('', () => {

})