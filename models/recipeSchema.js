const mongoose = require('mongoose');
const ingredientSchema = new mongoose.Schema({
  ingredient: { type: String, required: true },
  line: { type: String, required: true }
});
const recipeSchema = new mongoose.Schema({
  chef: { type: String, required: true },
  chef_id: { type: String, required: true },
  cooking_time_minutes: { type: Number, required: true },
  description: { type: String, required: true },
  error: { type: Boolean, default: false },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  instructions_detailed: [ingredientSchema],
  photo_url: { type: String, required: false },
  preparation_time_minutes: { type: Number, required: true },
  program: { type: String, required: false },
  program_id: { type: String, required: false },
  serves: { type: Number, required: true },
  time_scraped: { type: Number, required: true },
  title: { type: String, required: true },
  total_time_minutes: { type: Number, required: true },
  url: { type: String, required: true },
  kcal: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  salt: { type: Number, required: false }, //changed to false for import
  carbohydrate: { type: Number, required: true },
  sugar: { type: Number, required: true },
  fibre: { type: Number, required: true },
  recipe_id: { type: Number, required: true }
});
module.exports = mongoose.model('Recipe', recipeSchema);