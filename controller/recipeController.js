import { getRecipeId } from "db/utils/getRecipeId";
import { NextResponse } from "next/server";
const clientPromise = require("../connection");
const Recipe = require("../schemas/recipeSchema");

export const getRecipes = async (
  title,
  order_by = "1",
  sort_by = "recipe_id",
  chef,
  preparation_time_minutes,
  serves,
  mealType
) => {
  try {
    let findQuery = {};
    if (title) {
      findQuery.title = { $regex: title, $options: "i" };
    }
    if (chef) {
      findQuery.chef = { $regex: chef, $options: "i" };
    }
    if (mealType) {
      findQuery.mealType = { $regex: mealType, $options: "i" };
    }
    
    if (preparation_time_minutes) {
      findQuery.preparation_time_minutes = {
        $eq: Number(preparation_time_minutes),
      };
    }
    if (serves) {
      findQuery.serves = {
        $eq: Number(serves),
      };
    }
    let sortQuery = {};
    if (sort_by) {
      sortQuery[sort_by] = Number(order_by);
    }
    const client = await clientPromise;
    const db = await client.db();
    const recipes = await db.collection("recipes");
    const result = await recipes
      .find(findQuery)
      .sort(sortQuery)
      .map((recipe) => ({ ...recipe, _id: recipe._id.toString() }))
      .toArray();
    console.log({recipes: result}, ' response')
    return NextResponse.json({recipes: result}, { status: 200 })
  } catch (err) {
    console.log(err,'controller error')
  }
};

export const getRecipeById = async (recipe_id) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const recipes = await db.collection("recipes");
    const result = await recipes.findOne({ recipe_id: parseInt(recipe_id) });

    if (result === null) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ recipe: result }, { status: 200 });

  } catch (error) {}
};

export const postRecipe = async (body) => {
  try {
    const validation = new Recipe(body);
    await validation.validate();
    const recipe_id = await getRecipeId();
    body.recipe_id = recipe_id;
    const recipeId = parseInt(recipe_id);
  
    const client = await clientPromise;
    const db = await client.db();
    const recipeCollection = await db.collection("recipes");
    const result = await recipeCollection.insertOne(body);
    const newRecipe = await recipeCollection.findOne({ recipe_id: recipeId });

    return NextResponse.json({ recipe: newRecipe }, { status: 200 });
  } catch (err) {
    console.error('Validation error:', err);
    return NextResponse.json({ error: err.message || "Bad Request", details: err.errors }, { status: 400 });
  }
};

export const patchRecipe = async (recipe_id, updateData) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const reciCollection = db.collection("recipes");

    const recipeUpdate = updateData.recipe;

    const recipeId = parseInt(recipe_id);
    const validation = new Recipe(recipeUpdate);
    await validation.validate();

    const result = await reciCollection.updateOne(
      { recipe_id: recipeId },
      { $set: recipeUpdate }
    );
    return NextResponse.json(
      { message: "Recipe updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};

export const deleteRecipe = async (recipe_id) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const recipeCollection = db.collection("recipes");
    const recipeId = parseInt(recipe_id);
    const result = await recipeCollection.deleteOne({ recipe_id: recipeId });
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

