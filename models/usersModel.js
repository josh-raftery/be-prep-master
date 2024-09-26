import clientPromise from "connection";
const User = require("../schemas/usersSchema.js");
const PatchUserMyRecipes = require("../schemas/patchMyRecipesUsers.js");

export async function selectUsers() {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const users = await db.collection("users");
    const result = await users
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { users: result };
  } catch (err) {}
}

export const getUserForSignIn = async (username) => {
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
    console.error("Error in getUsersForSign:", error);
    return null;
  }
};
export const fetchUserById = async (user_id) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const users = await db.collection("users");
    const result = await users.findOne({ user_id: parseInt(user_id) });

    return result;
  } catch (error) {
    console.error("Error in getUserById: ", error);
    return null;
  }
};

export const insertUser = async (body) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const userCollection = await db.collection("users");

    const allUsers = await userCollection.find({}).toArray();
    const user_id = allUsers.length + 1;

    body.user_id = user_id;
    body.shopping_list = [];
    body.my_recipes = [];

    const validation = new User(body);
    await validation.validate();

    const result = await userCollection.insertOne(body);
    const newUser = await userCollection.findOne({ user_id });

    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
};
export const updateUser = async (user_id, updateData) => {
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

    return { message: "User updated successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};
export const addToMyRecipes = async (user_id, updateData) => {
  try {
    const client = await clientPromise;
    const db = await client.db();
    const userCollection = db.collection("users");
    const userUpdate = { my_recipes: updateData.my_recipes };

    const validation = new PatchUserMyRecipes(userUpdate);
    await validation.validate();

    const result = await userCollection.findOne({
      user_id: parseInt(user_id),
    });

    if (!result) {
      return null;
    }

    result.my_recipes.push(userUpdate.my_recipes);

    const updateDB = await userCollection.updateOne(
      { user_id: parseInt(user_id) },
      { $set: { my_recipes: result.my_recipes } }
    );
    const updatedUser = await userCollection.findOne({
      user_id: parseInt(user_id),
    });
    return { message: "Recipe added successfully", user: updatedUser };
  } catch (err) {
    throw new Error(err.message || "Unknown Error");
  }
};
