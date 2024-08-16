const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

const { mongoDatabase } = require("./connection");

async function startServer() {
  try {
    await mongoDatabase(); // Ensure the database is connected
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer(); // Call the function to start the server
