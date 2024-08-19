const Recipes = require("../../models/recipeSchema");
const Users = require("../../models/usersSchema");
const Ingredients = require("../../models/ingredientsListSchema");
const db = require("../../connection");

async function seedDB({ recipeData, ingredientsData, userData }) {
  try {
    await db();

    await Ingredients.deleteMany({});
    console.log("Existing ingredients removed");

    await Ingredients.insertMany(ingredientsData);
    console.log("ingredients seeded successfully");

    await Recipes.deleteMany({});
    console.log("Existing recipes removed");

    await Recipes.insertMany(recipeData);
    console.log("Recipes seeded successfully");

    await Users.deleteMany({});
    console.log("Existing users removed");

    await Users.insertMany(userData);
    console.log("Users seeded successfully");

  } catch (err) {
    console.error("Error seeding data:", err);
  }
}

module.exports = seedDB;
