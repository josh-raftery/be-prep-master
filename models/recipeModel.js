const clientPromise = require("../connection");
const Recipe = require("../schemas/recipeSchema");
import { getRecipeId } from "db/utils/getRecipeId";
export const fetchRecipes = async ({
  title,
  order_by,
  sort_by,
  chef,
  preparation_time_minutes,
  serves,
  mealType,
}) => {
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
    return result;
  } catch (err) {
    console.error(err, "controller error");
    throw err;
  }
};
export const fetchRecipeById = async (recipe_id) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const recipes = await db.collection("recipes");
    const result = await recipes.findOne({ recipe_id: parseInt(recipe_id) });
    return result;
  } catch (err) {
    console.log(err, "from model, recipebyid");
  }
};
export const insertRecipe = async (body) => {
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
    const newRecipe = await recipeCollection.findOne({
      recipe_id: recipeId,
    });
    return newRecipe;
  } catch (err) {
    console.log(err, ":Model error");
  }
};
export const updateRecipeById = async (recipe_id, updateData) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const reciCollection = db.collection("recipes");
    const result = await reciCollection.updateOne(
      { recipe_id: recipeId },
      { $set: recipeUpdate }
    );
    return result;
  } catch (err) {
    console.log("updating recipes: ", err);
  }
};
export const deleteRecipeById = async (recipe_id) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const recipeCollection = db.collection("recipes");

    const result = await recipeCollection.deleteOne({
      recipe_id: parseInt(recipe_id),
    });
    return result;
  } catch (err) {
    console.log(err, "deleting recipe err");
  }
};
