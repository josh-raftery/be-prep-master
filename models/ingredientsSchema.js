const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Ingredients', recipeSchema);