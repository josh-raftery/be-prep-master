const { NextResponse } = require("next/server");
const ingredientModel = require("../models/ingredientModel");

const getIngredients = async () => {
  try {
    const ingredients = await ingredientModel.fetchIngredients();
    return NextResponse.json({ ingredients }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

const getIngredientsById = async (ingredient_id) => {
  try {
    const ingredient = await ingredientModel.fetchIngredientsById(
      ingredient_id
    );
    if (!ingredient) {
      return NextResponse.json(
        {
          error: "Not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({ ingredient }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "An error occured" }, { status: 500 });
  }
};

module.exports = { getIngredients, getIngredientsById };
