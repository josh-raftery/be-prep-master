const mongoose = require('mongoose');

const basketPatchSchema = new mongoose.Schema({
  ingredients: [{ type: String, required: true }] // Array of ingredient names
});

const BasketPatch = mongoose.models.BasketPatch ? mongoose.models.BasketPatch : mongoose.model('BasketPatch', basketPatchSchema);

module.exports = BasketPatch