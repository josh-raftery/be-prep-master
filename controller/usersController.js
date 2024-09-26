const { NextResponse } = require("next/server");

const {
  selectUsers,
  fetchUserById,
  insertUser,
  updateUser,
  addToMyRecipes,
  getUserForSignIn,
} = require("models/usersModel");

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
};
const patchUser = async (req, res) => {
  const user_id = req;
  const updateData = req.body;
  try {
    const response = await updateUser(user_id, updateData);
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};

const addToMyRecipesInController = async (req, res) => {
  const user_id = req;
  const updateData = req.body;
  try {
    const updatedUser = await addToMyRecipes(user_id, updateData);
    if (!updatedUser) {
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
  addToMyRecipesInController,
  signInUser,
};
