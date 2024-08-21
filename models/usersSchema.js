const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {type: Number, required: false, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: true },
  ingredients_used: [{ type: String }], // Array of ingredient names
  favourite_recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }], // Array of references to Recipe model
});

const User = mongoose.models.User ? mongoose.models.User : mongoose.model('User', userSchema);

module.exports = User