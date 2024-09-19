const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {type: Number, required: false, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: false },
  shopping_list: [{ type: String }], 
  my_recipes: [{ type: String }], 
  
});

const User = mongoose.models.User ? mongoose.models.User : mongoose.model('User', userSchema);

module.exports = User