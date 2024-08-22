import { getRecipeId } from "db/utils/getRecipeId";
import { NextResponse } from "next/server";
const clientPromise = require("../connection");
const Recipe = require("../models/recipeSchema");

const getRecipes = async (title, order_by, sort_by = "recipe_id") => {
  try {
    let findQuery = {};
    if (title) {
      findQuery.title = { $regex: title, $options: "i" };
    }
    let sortQuery = {};
    if (order_by) {
      sortQuery[sort_by] = Number(order_by);
    }
    console.log(sortQuery, "herehrererer");
    const client = await clientPromise;
    const db = await client.db();
    const recipes = await db.collection("recipes");
    const result = await recipes
      .find(findQuery)
      .sort(sortQuery)
      // .limit(20) - messing up with the post testing, as there 239 recipes
      .map((recipe) => ({ ...recipe, _id: recipe._id.toString() }))
      .toArray();
    return { recipes: result };
  } catch (err) {}
};

const getRecipeById = async (recipe_id) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const recipes = await db.collection("recipes");
    const result = await recipes.findOne({ recipe_id: parseInt(recipe_id) });

    if (result === null) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ recipe: result }, { status: 200 });

    // return { recipe: result };
  } catch (error) {}
};

const postRecipe = async (body) => {
  try {
    const validation = new Recipe(body);
    await validation.validate();
    const recipe_id = await getRecipeId();
    body.recipe_id = recipe_id;

    const client = await clientPromise;
    const db = await client.db();
    const recipes = await db.collection("recipes");
    const result = await recipes.insertOne(body);

    return NextResponse.json({ recipes: result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};

const patchRecipe = async (recipe_id, updateData) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const userCollection = db.collection("recipes");

    const recipeUpdate = updateData.recipe;

    const recipeId = parseInt(recipe_id);
    const validation = new Recipe(recipeUpdate);
    await validation.validate();

    const result = await userCollection.updateOne(
      { recipe_id: recipeId },
      { $set: recipeUpdate }
    );
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

module.exports = {
  getRecipes,
  getRecipeById,
  postRecipe,
  patchRecipe
};
