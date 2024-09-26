const { NextResponse } = require("next/server");
const clientPromise = require("../connection");
const PatchMealPlan = require("schemas/patchMealplanSchema");
const { getMealId } = require("db/utils/getMealId");
const DeleteMeal = require("schemas/patchDeleteMeal");
const PostMealPlan = require("schemas/postMealPlanSchema");

const postMealPlan = async (user_id,request) => {
  try{
      console.log('test <-------------------')
      const client = await clientPromise
      const db = await client.db()
      const mealplanCollection = await db.collection('mealplan')
      request.user_id = parseInt(user_id)

      console.log(request,' <-----')

      const validation = new PostMealPlan(request);
      await validation.validate();
      
      const result = await mealplanCollection.insertOne(request);

      return NextResponse.json({mealplan: result}, {status:200})
  } catch(err){
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

const getMealPlan = async (user_id) => {
    try {
      const client = await clientPromise
      const db = await client.db()
      const user = await db.collection('mealplan')
      const result = await user
        .findOne({ user_id: parseInt(user_id) });  
        
        if(result === null){
          return NextResponse.json({ error: 'Not Found' }, { status: 404 })
        }
        return NextResponse.json({user: result}, {status:200})
    } catch (error) {
      return { error: 'An error occurred' }; 
    }
};

const addToMealPlan = async (updateData,user_id) => {
  try{
    const client = await clientPromise;
    const db = await client.db();
    const mealplanCollection = db.collection("mealplan");
    const meal_id = await getMealId(parseInt(user_id))

    updateData.meals.map((meal,index) => {
      meal.meal_id = meal_id + index
    })

    const validation = new PatchMealPlan(updateData);
    await validation.validate();

    const result = await mealplanCollection.findOne({
      user_id: parseInt(user_id)
    });

    result.meals.push(...updateData.meals)

    if (result === null) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const updateDB = await mealplanCollection.updateOne(
      { user_id: parseInt(user_id) },
      { $set: result }
    );

    const newMealPlan = await mealplanCollection.findOne({
      user_id: parseInt(user_id)
    });

    return NextResponse.json({ mealplan: updateData }, { status: 200 });
  }catch(err){
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

async function deleteFromMealPlan(updateData,user_id){
  try{

    const client = await clientPromise;
    const db = await client.db();
    const mealplanCollection = db.collection("mealplan");
    
    const validation = new DeleteMeal(updateData);
    await validation.validate();
    
    
    const result = await mealplanCollection.findOne({
      user_id: parseInt(user_id)
    });

    if (result === null) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    let newMealPlan = result

    updateData.meals.forEach((currMeal) => {
      newMealPlan.meals = newMealPlan.meals.filter((meal) => {
        if(meal.meal_id != currMeal.meal_id){
          return meal
        }
      })
    })

    const updateDB = await mealplanCollection.updateOne(
      { user_id: parseInt(user_id) },
      { $set: newMealPlan }
    );

    const newResult = await mealplanCollection.findOne({
      user_id: parseInt(user_id)
    });

    return NextResponse.json({ mealplan: newResult }, { status: 200 });
  }catch(err){
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
  

module.exports = {getMealPlan,addToMealPlan,deleteFromMealPlan, postMealPlan}