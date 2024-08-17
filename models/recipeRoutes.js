const express = require("express");
const router = express.Router();
const recipeController = require("../controller/recipeController");

router.get("/getRecipe", recipeController.getRecipes);
router.get("/getRecipe/:_id", recipeController.getRecipeById);

module.exports = router;
