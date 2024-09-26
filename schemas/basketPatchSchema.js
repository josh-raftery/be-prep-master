const mongoose = require('mongoose');

const basketPatchSchema = new mongoose.Schema({
  shopping_list: {
    type: [String], 
    required: true,  
  }
});

const BasketPatch = mongoose.models.BasketPatch ? mongoose.models.BasketPatch : mongoose.model('BasketPatch', basketPatchSchema);

module.exports = BasketPatch