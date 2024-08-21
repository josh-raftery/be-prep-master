import { NextResponse } from 'next/server';
const clientPromise = require('../connection');


const getRecipes = async(title,order_by,sort_by='recipe_id')=> {
  try{
    let findQuery = {}
    if(title){
      findQuery.title = { $regex: title, $options: 'i' }
    }
    let sortQuery = {}
    if(order_by){
      sortQuery[sort_by] = Number(order_by)
    }
    console.log(sortQuery,"herehrererer")
    const client = await clientPromise
    const db = await client.db()
    const recipes = await db.collection('recipes')
    const result = await recipes
      .find(findQuery)
      .sort(sortQuery)
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

    if(result === null){
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    return NextResponse.json({recipe: result}, {status:200})
      
    // return { recipe: result };
  } catch (error) {
    
  }
};





module.exports = {
  getRecipes,
  getRecipeById
};