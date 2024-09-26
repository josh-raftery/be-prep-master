const { NextResponse } = require("next/server");
const clientPromise = require("../connection");
const User = require("../schemas/usersSchema.js");
const { getUserId } = require("../db/utils/getUserId");
const PatchUserMyRecipes= require("../schemas/patchMyRecipesUsers.js");
const { selectUsers } = require("models/usersModel");
const BasketPatch = require("schemas/basketPatchSchema");

const getUsers = async () => {
  return await selectUsers()
};

const getUserForSignIn = async (username) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const users = await db.collection("users");
    
    const result = await users.findOne({ username: username });
    
    if (!result) {
      return null;  
    }
    return result;  
  } catch (error) {
    console.error("Error in getUserForSignIn:", error);
    return null;  
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
    const client = await clientPromise;
    const db = await client.db();
    const userCollection = await db.collection("users");

    const allUsers = await userCollection
    .find({})
    .toArray()

    const user_id = allUsers.length + 1

    body.user_id = user_id;
    body.shopping_list = []
    body.my_recipes = []
    
    const validation = new User(body);
    await validation.validate();

    const result = await userCollection.insertOne(body);

    const newUser = await userCollection.findOne({ user_id });
    
    return NextResponse.json({ user: newUser }, { status: 200 });
  } catch (err) {

    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
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
    return NextResponse.json({ error: err}, { status: 400 });
  }
};


const patchUserBasket = async (user_id, request) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const userCollection = db.collection("users");

    const userId = parseInt(user_id);

    const validation = new BasketPatch(request);
    await validation.validate();

    const userObject = await userCollection.findOne({ user_id: userId });
    userObject.shopping_list = request.shopping_list

    const result = await userCollection.updateOne(
      { user_id: userId },
      { $set: userObject }
    );

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err}, { status: 400 });
  }
}

const addToMyRecipes = async (user_id, updateData) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const userCollection = db.collection("users");
    const userUpdate = { my_recipes: updateData.my_recipes };

    const validation = new PatchUserMyRecipes(userUpdate);
    await validation.validate();

    const result = await userCollection.findOne({
      user_id: parseInt(user_id)
    })

    if (result === null) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    } 
    result.my_recipes.push(userUpdate.my_recipes)
    const updateDB = await userCollection.updateOne(
      { user_id: parseInt(user_id) },
      { $set: result }
    )
    const updatedUser = await userCollection.findOne({
      user_id: parseInt(user_id)
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  }catch (err) {
    return NextResponse.json({ error: err.message || "Unknown Error" }, { status: 400 });
  }
}

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  patchUser,
  addToMyRecipes,
  getUserForSignIn,
  patchUserBasket
};
