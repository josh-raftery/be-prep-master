const mongoose = require('mongoose');
const Counter = require('./idCounterSchema');

const ingredientSchema = new mongoose.Schema({
  ingredient: { type: String, required: false },
  line: { type: String, required: true },
  ingredient_id: { type: Number, unique: true },
});

const recipeSchema = new mongoose.Schema({
  recipe_id: { type: Number, unique: true },
  chef: { type: String, required: true },
  cooking_time_minutes: { type: Number, required: true },
  description: { type: String, required: true },
  error: { type: Boolean, default: false },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  instructions_detailed: [ingredientSchema],
  photo_url: { type: String, required: false },
  preparation_time_minutes: { type: Number, required: true },
  serves: { type: Number, required: true },
  title: { type: String, required: true },
  total_time_minutes: { type: Number, required: true },
  url: { type: String, required: true },
  kcal: { type: Number, required: true },
  protein: { type: Number, required: false },
  fat: { type: Number, required: false },
  salt: { type: Number, required: false },
  carbohydrate: { type: Number, required: false },
  sugar: { type: Number, required: false },
  fibre: { type: Number, required: false },
});

// Pre-save middleware to auto-increment the recipe_id and ingredient_id
recipeSchema.pre('save', async function(next) {
  const recipe = this;
  
  // Auto-increment recipe_id
  if (recipe.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'recipe_id' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      recipe.recipe_id = counter.seq;
    } catch (error) {
      return next(error);
    }
  }
  
  // Auto-increment ingredient_id for each ingredient in instructions_detailed
  for (let ingredient of recipe.instructions_detailed) {
    if (ingredient.ingredient_id == null) {  // Check if ingredient_id is not set
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: 'ingredient_id' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        ingredient.ingredient_id = counter.seq;

        // Additional safeguard
        if (ingredient.ingredient_id == null) {
          return next(new Error('ingredient_id was not assigned.'));
        }
      } catch (error) {
        return next(error);
      }
    }
  }
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema, 'recipe');
