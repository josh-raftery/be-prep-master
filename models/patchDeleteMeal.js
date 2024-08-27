const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  meal_id: { type: Number, required: true, unique:true }
});

const userMealsSchema = new mongoose.Schema({
  meals: [mealSchema]
});

const DeleteMeal = mongoose.models.DeleteMeal ? mongoose.models.DeleteMeal : mongoose.model('DeleteMeal', userMealsSchema);

module.exports = DeleteMeal;