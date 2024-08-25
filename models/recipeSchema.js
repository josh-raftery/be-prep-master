const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  ingredient: { type: String, required: false },
  line: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema({
  chef: { type: String, required: true },
  cooking_time_minutes: { type: Number, required: true },
  description: { type: String, required: true },
  error: { type: Boolean, default: false },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  instructions_detailed: [ingredientSchema],
  photo_url: { type: String, required: true },
  preparation_time_minutes: { type: Number, required: true },
  serves: { type: Number, required: false },
  title: { type: String, required: true },
  total_time_minutes: { type: Number, required: false },
  url: { type: String, required: false },
  kcal: { type: Number, required: false },
  protein: { type: Number, required: false },
  fat: { type: Number, required: false },
  salt: { type: Number, required: false },
  carbohydrate: { type: Number, required: false },
  sugar: { type: Number, required: false },
  fibre: { type: Number, required: false },
  recipe_id: { type: Number, required: false, unique: true }
});



const Recipes = mongoose.models.Recipes ? mongoose.models.Recipes : mongoose.model('Recipes', recipeSchema)

module.exports = Recipes

