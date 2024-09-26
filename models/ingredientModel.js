const clientPromise = require("../connection");

export const fetchIngredients = async () => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const ingredients = await db.collection("ingredients");
    const result = await ingredients
      .find({})
      .map((ingredient) => ({ ...ingredient, _id: ingredient._id.toString() }))
      .toArray();
    return result;
  } catch (err) {
    throw new Error("Could not fetch ingredients");
  }
};
export const fetchIngredientsById = async (ingredient_id) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const ingredients = await db.collection("ingredients");
    const result = await ingredients.findOne({
      ingredient_id: parseInt(ingredient_id),
    });
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    return { error: "An error occurred" };
  }
};
