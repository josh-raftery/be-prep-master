const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: true },
  favourite_recipes: [{ type: String, default: false }],
  ingredients_used: [{ type: String, default: false }],
});

module.exports = mongoose.model('Users', usersSchema);