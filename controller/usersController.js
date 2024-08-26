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
    console.log(err);
  }
};

const getUsersById = async (user_id) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const user = await db.collection("users");
    const result = await user.findOne({ user_id: parseInt(user_id) });

    if (result === null) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ user: result }, { status: 200 });
  } catch (error) {
    return { error: "An error occurred" };
  }
};

const postUser = async (body) => {
  try {
    const validation = new User(body);
    await validation.validate();
 
    const user_id = await getUserId();
    body.user_id = user_id;
    const userId = parseInt(user_id);

    const client = await clientPromise;
    const db = await client.db();
    const userCollection = await db.collection("users");

    const result = await userCollection.insertOne(body);

    const newUser = await userCollection.findOne({ user_id: userId });
    
    return NextResponse.json({ user: newUser }, { status: 200 });
  } catch (err) {

    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};
const patchUser = async (user_id, updateData) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const userCollection = db.collection("users");

    const userUpdate = updateData.user;

    const userId = parseInt(user_id);

    const validation = new User(userUpdate);
    await validation.validate();

    const result = await userCollection.updateOne(
      { user_id: userId },
      { $set: userUpdate }
    );

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  patchUser,
};
