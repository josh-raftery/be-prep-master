const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recipeRoutes = require("./recipeRoutes");

const app = express();

app.use(express.json());
app.use(cors());

  app.use("/api", recipeRoutes);

module.exports = app;
