const { NextResponse } = require("next/server");
const clientPromise = require("../connection");
const PatchMealPlan = require("models/patchMealplanSchema");
const { getMealId } = require("db/utils/getMealId");

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

    console.log(result, ' resultresult')

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
  

module.exports = {getMealPlan,addToMealPlan}