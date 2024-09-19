import {
  deleteRecipeById,
  fetchRecipeById,
  fetchRecipes,
  insertRecipe,
  updateRecipeById,
} from "models/recipeModel";
import { NextResponse } from "next/server";
const clientPromise = require("../connection");
const Recipe = require("../schemas/recipeSchema");

export const getRecipes = async (req, res) => {
  try {
    const {
      title,
      order_by = "1",
      sort_by = "recipe_id",
      chef,
      preparation_time_minutes,
      serves,
      mealType,
    } = req.query;
    const recipes = await fetchRecipes({
      title,
      order_by,
      sort_by,
      chef,
      preparation_time_minutes,
      serves,
      mealType,
    });
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (err) {
    console.error("error from the contoller: ", err);
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const { recipe_id } = req.query;
    const recipe = await fetchRecipeById(recipe_id);
    if (!recipe) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ recipe }, { status: 200 });
  } catch (error) {
    console.log("error from  the controller: ", err);
  }
};

export const postRecipe = async (body) => {
  try {
    const newRecipe = await insertRecipe(body);
    return NextResponse.json({ recipe: newRecipe }, { status: 200 });
  } catch (err) {
    console.log("Error while creating recipe: ", err);
  }
};

export const patchRecipe = async (req, res) => {
  try {
    const { recipe_id } = req.query;
    const { updateData } = req.body;
    const recipeUpdate = updateData.recipe;
    const validation = new Recipe(recipeUpdate);
    await validation.validate();
    const result = await updateRecipeById(recipe_id, recipeUpdate);

    if (result.modifiedCount === 1) {
      return NextResponse.json(
        { message: "Recipe updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { recipe_id } = req.query;

    const result = await deleteRecipeById(recipe_id);
    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: "Recipe deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};
