const Recipe = require('../models/recipeSchema');
// const { ObjectId } = require('mongodb');


const getRecipes = (req, res) => {
  console.log(Recipe, ' dfsfsf')
  return Recipe.find({})
    .then(recipes => {
      console.log(recipes, ' <--------------')
      return recipes
    })
    .catch(error => {
      // res.status(500).json({ message: "Error fetching recipes", error });  // revisit
    });
};

const getRecipeById = (req, res) => {
  const { recipe_id } = req.params;
  console.log('recipe_id received:', recipe_id);
  try {
  // Ensure this is a valid ObjectId
      Recipe.findOne({ recipe_id })
        .then(recipe => {
          if (recipe) {
            res.json(recipe);
          } else {
            res.status(404).json({ message: "Recipe not found" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: "Error fetching recipe by ID", error });
        });
  } catch (error) {
      res.status(400).json({ message: "Invalid ID format", error });
  }}



module.exports = {
  getRecipes,
  getRecipeById
};