const { default: mongoose } = require('mongoose');
const seed = require('./seed.js');
const recipeData = require('../data/test/dev/recipesData.json')
const ingredientsData = require('../data/test/dev/ingredientsData.json')
const userData = require('../data/test/dev/userData.json')

const runSeed = () => {
  return seed({recipeData,ingredientsData,userData}).then(() => {
    mongoose.connection.close();
  })
};

runSeed();