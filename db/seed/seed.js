const Recipes = require("../../models/recipeSchema");
const clientPromise = require("../../connection");
const Ingredients = require("../../models/ingredientsListSchema.js")
const User = require("../../models/usersSchema.js");
const MealPlan = require("../../models/mealPlanSchema");


async function seedDB({ recipeData, ingredientsData, userData, mealPlanData }) {
  try {
    const client = await clientPromise
    const db = await client.db()

    await db.collection('ingredients').deleteMany({});
    await db.collection('recipes').deleteMany({});
    await db.collection('users').deleteMany({});
    await db.collection('mealplan').deleteMany({});

    console.log("Existing data removed");
    
    for (const ingredient of ingredientsData) {
      const validation = new Ingredients(ingredient);
      await validation.validate();
    }

    for (const recipe of recipeData) {
      const validation = new Recipes(recipe);
      await validation.validate();
    }

    for (const user of userData) {
      const validation = new User(user);
      await validation.validate();
    }

    for (const mealPlan of mealPlanData) {
      const validation = new MealPlan(mealPlan);
      await validation.validate();
    }

    await db.collection('ingredients').insertMany(ingredientsData);
    await db.collection('recipes').insertMany(recipeData);
    await db.collection('users').insertMany(userData);
    await db.collection('mealplan').insertMany(mealPlanData);

    console.log("New data inserted successfully");

  } catch (err) {
    console.error("Error seeding data:", err);
  }
}

module.exports = seedDB;
