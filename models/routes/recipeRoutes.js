const express = require("express");
const recipeController = require("../../controller/recipeController");

const recipeRouter=express.Router();

recipeRouter.get("/", recipeController.getRecipes);
recipeRouter.get("/:recipe_id", recipeController.getRecipeById);

module.exports = recipeRouter;
