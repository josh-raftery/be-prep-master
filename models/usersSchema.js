const mongoose = require('mongoose');
const Counter = require('./idCounterSchema');

const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar_url: { type: String, required: true },
  ingredients_used: [{ type: String }], // Array of ingredient names
  favourite_recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] // Array of references to Recipe model
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'user_id' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      user.user_id = counter.seq;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);