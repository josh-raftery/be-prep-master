const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {type: Number, required: false, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: false },
  ingredients_used: [{ type: String }], // Array of ingredient names
  my_recipes: [{ type: String }], // Array of references to Recipe model
  
});

const User = mongoose.models.User ? mongoose.models.User : mongoose.model('User', userSchema);

module.exports = User