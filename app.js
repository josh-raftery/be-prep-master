const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recipeRoutes = require("./recipeRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// mongoose
//   .connect("mongodb://localhost:27017/", {})
//   .then(() => {})
//   .catch((err) => {});

  app.use("/api", recipeRoutes);

// app.listen(8002, () => {});

module.exports = app;
