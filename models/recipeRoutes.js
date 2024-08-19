const express = require('express');
const router = express.Router();
const recipeController = require('./controller/recipeController');

router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/:recipe_id', recipeController.getRecipeById);


module.exports = router;