const Recipes = require("../../models/recipeSchema");
const Users = require("../../models/usersSchema");
const Ingredients = require("../../models/ingredientsListSchema");
const clientPromise = require("../../connection");


async function seedDB({ recipeData, ingredientsData, userData }) {
  try {
    const client = await clientPromise
    const db = await client.db()

    await db.collection('ingredients').deleteMany({});
    await db.collection('recipes').deleteMany({});
    await db.collection('users').deleteMany({});

    console.log("Existing data removed");

    // Insert new data
    await db.collection('ingredients').insertMany(ingredientsData);
    await db.collection('recipes').insertMany(recipeData);
    await db.collection('users').insertMany(userData);

    console.log("New data inserted successfully");

  } catch (err) {
    console.error("Error seeding data:", err);
  }
}

module.exports = seedDB;
