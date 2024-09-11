const mongoose = require('mongoose');

const ingredientsListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredient_id: { type: Number, unique: true }
});



module.exports = mongoose.model('Ingredients', ingredientsListSchema);