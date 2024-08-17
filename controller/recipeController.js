const Recipe = require('../models/recipeSchema');
const { ObjectId } = require('mongodb');


const getRecipes = (req, res) => {
  Recipe.find({})
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => {
      res.status(500).json({ message: "Error fetching recipes", error });
    });
};

const getRecipeById = (req, res) => {
  const { _id } = req.params;
  console.log('_id received:', _id);
  try {
      const objectId = ObjectId(_id);  // Ensure this is a valid ObjectId
      Recipe.findOne({ "_id": objectId })
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