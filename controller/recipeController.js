
const clientPromise = require('../connection');


const getRecipes = async()=> {
    try{
      const client = await clientPromise
      const db = await client.db()
      const recipes = await db.collection('recipes')
      const result = await recipes
        .find({})
        .limit(20)
        .map(recipe => ({...recipe, _id: recipe._id.toString() }))
        .toArray()
      return {recipes: result}
    }catch(err){
    }
};


const getRecipeById = async (recipe_id) => {
  try {
    const client = await clientPromise
    const db = await client.db()
    const recipes = await db.collection('recipes')
    const result = await recipes
      .findOne({ recipe_id: parseInt(recipe_id) });  
      
    return { recipe: result };
  } catch (error) {
    return { error: 'An error occurred' }; 
  }
};

module.exports = {
  getRecipes,
  getRecipeById
};