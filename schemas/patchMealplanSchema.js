const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  date: { type: String, required: true },  
  recipe_id: { type: Number, required: true },
  mealType: { 
    type: String, 
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert']
  },
  meal_id: { type: Number, required: true, unique:true }
});

const userMealsSchema = new mongoose.Schema({
  meals: [mealSchema]
});

const PatchMealPlan = mongoose.models.PatchMealPlan ? mongoose.models.PatchMealPlan : mongoose.model('PatchMealPlan', userMealsSchema)

module.exports = PatchMealPlan;