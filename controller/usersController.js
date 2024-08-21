const clientPromise = require("../connection");

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
        
      return { user: result };
    } catch (error) {
      return { error: 'An error occurred' }; 
    }
  };
  



module.exports = {
  getUsers,
  getUsersById
};
