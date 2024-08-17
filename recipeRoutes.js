const express = require('express');
const router = express.Router();
const recipeController = require('./controller/recipeController');

router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/:_id', recipeController.getRecipeById);


module.exports = router;