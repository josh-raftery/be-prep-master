const { NextResponse } = require("next/server");
const clientPromise = require("../connection");
const User = require("../schemas/usersSchema.js");
const { getUserId } = require("../db/utils/getUserId");
const PatchUserMyRecipes= require("../schemas/patchMyRecipesUsers.js");
const { selectUsers } = require("models/usersModel");
const BasketPatch = require("schemas/basketPatchSchema");

const getUsers = async () => {
  return await selectUsers();
};

const signInUser = async (req, res) => {
  const username = req;

  try {
    const user = await getUserForSignIn(username);
    if (!user) {
      return { message: "User not found" };
    }
    return { user };
  } catch (error) {
    console.error("Error in getUserForSignIn:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUsersById = async (req, res) => {
  const user_id = req;
  try {
    const user = await fetchUserById(user_id);

    if (!user) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error in getUserByIdController:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

const postUser = async (req, res) => {
  const body = req;

  try {
    const newUser = await insertUser(body);

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

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  patchUser,
  addToMyRecipes,
  getUserForSignIn,
  patchUserBasket
};
