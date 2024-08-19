const mongoose = require('mongoose');
const Counter = require('./idCounterSchema');

const ingredientsListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredient_id: { type: Number, unique: true }
});

ingredientsListSchema.pre('save', async function(next) {
  const ingredient = this;
  console.log('Saving ingredient:', ingredient);

  if (ingredient.isNew) {
    console.log('New ingredient detected, assigning ID...');
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'ingredient_id' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      ingredient.ingredient_id = counter.seq;
      console.log('Assigned ingredient_id:', counter.seq);
    } catch (error) {
      console.error('Error incrementing counter:', error);
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Ingredients', ingredientsListSchema);