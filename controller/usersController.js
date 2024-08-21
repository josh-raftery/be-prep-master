const { NextResponse } = require("next/server");
const clientPromise = require("../connection");
const User = require("../models/usersSchema.js");
const { getUserId } = require("../db/utils/getUserId");

const getUsers = async () => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const users = await db.collection("users");
    const result = await users
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { users: result };
  } catch (err) {
    console.log(err)
  }
};

const getUsersById = async (user_id) => {
    try {
      const client = await clientPromise
      const db = await client.db()
      const user = await db.collection('users')
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

const postUser = async (body) => {
  try{
    const validation = new User(body);
    await validation.validate();

    const user_id = await getUserId()
    body.user_id = user_id

    const client = await clientPromise
    const db = await client.db()
    const user = await db.collection('users')
    const result = await user
     .insertOne(body)

    return NextResponse.json({user: result}, {status:200})
  }
  catch(err){
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
  



module.exports = {
  getUsers,
  getUsersById,
  postUser
};
