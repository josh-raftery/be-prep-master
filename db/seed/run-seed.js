const { default: mongoose } = require('mongoose');
const seed = require('./seed.js');
const recipeData = require('../data/dev/recipesData.json')
const ingredientsData = require('../data/dev/ingredientsData.json')
const userData = require('../data/dev/userData.json')

const runSeed = () => {
  return seed({recipeData,ingredientsData,userData}).then(() => {
    mongoose.connection.close();
  })
};

runSeed();