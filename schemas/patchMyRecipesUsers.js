const mongoose = require('mongoose');

const patchMyRecipesUserSchema = new mongoose.Schema({
  my_recipes: { type: [Number], required: true }, // Array of references to Recipe model
  
});

const PatchUserMyRecipes = mongoose.models.PatchUserMyRecipes ? mongoose.models.PatchUserMyRecipes : mongoose.model('PatchUserMyRecipes', patchMyRecipesUserSchema);

module.exports = PatchUserMyRecipes