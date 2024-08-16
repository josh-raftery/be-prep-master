// const seedDB = require("db/seed/seed.js");
const { default: mongoose } = require("mongoose");
const seedDB = require("../db/seed/seed");
// const {recipeData} = 
// // , ingredientsData, userData

beforeAll(async () => {
  await seedDB()
});

afterAll(async () => {
    mongoose.connection.close();
});

test('', () => {
    
})