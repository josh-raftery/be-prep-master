const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  user_id: {type: Number, required: true, unique: false },
  ingredients: [{ type: String }], // Array of ingredient names
});

const Basket = mongoose.models.Basket ? mongoose.models.Basket : mongoose.model('Basket', basketSchema);

module.exports = Basket