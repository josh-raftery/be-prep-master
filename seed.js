const mongoose = require('mongoose');
require('dotenv').config({ path: './.env.test' }); 
const recipeTestData=require("./data/test/recipeWithIDSample.json")
const mongoURI = process.env.MONGO_URI;
const Recipes = require('./models/recipeSchema');

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
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {

        mongoose.connection.close();
    }
}


seedDB();
