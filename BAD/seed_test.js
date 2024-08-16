const mongoose = require("mongoose");
const { mongoDatabase } = require("./connection");
require("dotenv").config();
const schema = require("../models/recipeSchema");
const seedItems = require("./recipeWithIDSample");

const seedDb = async () => {
  await schema.deleteMany({});
  await schema.insertMany(seedItems);
  console.log("Success :) ");
};

seedDb()
  .then(() => {
    console.log(`items added`);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
  });
