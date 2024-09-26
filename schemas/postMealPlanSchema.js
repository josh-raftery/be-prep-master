const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  meals: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  user_id: {
    type: Number,
    required: true
  }
});

const PostMealPlan =  mongoose.models.PostMealPlan ? mongoose.models.PostMealPlan : mongoose.model('PostMealPlan', MealSchema);

module.exports = PostMealPlan