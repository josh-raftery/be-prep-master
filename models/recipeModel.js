const clientPromise = require("../connection");
const Recipe = require("../schemas/recipeSchema");
import { getRecipeId } from "db/utils/getRecipeId";

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
