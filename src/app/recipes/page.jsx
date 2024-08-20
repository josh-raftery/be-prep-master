const connectToDatabase = require("../../../connection");
const { getRecipes } = require("../../../controller/recipeController");

async function appHandler(req, res) {
  await connectToDatabase();
  if (req.method === "GET") {
    return getRecipes(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

module.export = appHandler;
