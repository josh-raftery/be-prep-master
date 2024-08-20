const clientPromise = require('../connection');
const Recipes = require('../models/recipeSchema');
// const { ObjectId } = require('mongodb');

const getRecipes = async()=> {
    try{
      const client = await clientPromise
      const db = await client.db()
      const recipes = await db.collection('recipes')
      const result = await recipes
        .find({})
        .limit(20)
        .map(recipe => ({...recipe, _id: recipe._id.toString() }))
        .toArray()
      return {recipes: result}
    }catch(err){
      console.log(err, ' <------')
    }
};

const getRecipeById = () => {
  const { recipe_id } = req.params;
  
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