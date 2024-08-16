const mongoose = require('mongoose');
require('dotenv').config({ path: './.env.test' }); 
const recipeTestData=require("../data/test/recipeWithIDSample.json") // hardcoded test data, make programatic later
const usersTestData=require('../data/test/usersData') // hardcoded test data, make programatic later
const mongoURI = process.env.MONGO_URI;
const Recipes = require('../../models/recipeSchema');
const Users = require('../../models/usersSchema')

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); 
});

async function seedDB() {
    try {
      
        await Recipes.deleteMany({});
        console.log('Existing recipes removed');

        await Recipes.insertMany(recipeTestData);
        console.log('Recipes seeded successfully');

        await Users.deleteMany({});
        console.log('Existing users removed');

        await Users.insertMany(usersTestData);
        console.log('Users seeded successfully');

        // await Ingredients.deleteMany({});
        // console.log('Existing users removed');

        // await Ingredients.insertMany(ingredientsTestData);
        // console.log('Users seeded successfully');

    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {

        mongoose.connection.close();
    }
}


seedDB();
