const { NextResponse } = require("next/server");
const clientPromise = require("../connection");

const getIngredients = async () => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const ingredients = await db.collection("ingredients");
    const result = await ingredients
      .find({})
      .map((ingredient) => ({ ...ingredient, _id: ingredient._id.toString() }))
      .toArray();
    return { ingredients: result };
  } catch (err) {}
};

const getIngredientsById = async (ingredient_id) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const ingredients = await db.collection("ingredients");
    const result = await ingredients.findOne({
      ingredient_id: parseInt(ingredient_id),
    });
    if (result === null) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ ingredient: result }, { status: 200 });
  } catch (error) {
    return { error: "An error occured" };
  }
};

module.exports = { getIngredients, getIngredientsById };
