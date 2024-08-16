const mongoose = require('mongoose'); 
const recipeTestData=require("../data/test/recipeWithIDSample.json") // hardcoded test data, make programatic later
const usersTestData= require('../data/test/userTestData.json') // hardcoded test data, make programatic later
const ingredientsTestData=require('../data/test/ingredientsData.json')
const Recipes = require('../../models/recipeSchema');
const Users = require('../../models/usersSchema')
const Ingredients = require('../../models/ingredientsSchema')
const db = require('../../connection')

async function seedDB() {
    try {
        await db()

        await Recipes.deleteMany({});
        // console.log('Existing recipes removed');

        await Recipes.insertMany(recipeTestData);
        // console.log('Recipes seeded successfully');

        await Users.deleteMany({});
        // console.log('Existing users removed');

        await Users.insertMany(usersTestData);
        // console.log('Users seeded successfully');

        await Ingredients.deleteMany({});
        // console.log('Existing ingredients removed');

        await Ingredients.insertMany(ingredientsTestData);
        // console.log('ingredients seeded successfully');

    } catch (err) {
        // console.error('Error seeding data:', err);
    }
}


module.exports = seedDB
