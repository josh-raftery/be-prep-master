const { NextResponse } = require("next/server");
const clientPromise = require("../connection");

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
  

module.exports = {getMealPlan}