const connectToDatabase = require('../../../../connection')
const { getRecipeById } =require('../../../../controller/recipeController')

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'GET') {
    return getRecipeById(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}