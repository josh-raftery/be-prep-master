const { NextResponse } = require("next/server");
const clientPromise = require("../connection");
const Basket = require("../models/basketSchema");
const BasketPatch = require("models/basketPatchSchema");


const getAllBaskets = async () => {
    try {
      const client = await clientPromise;
      const db = await client.db();
      const basket = await db.collection("basket");
      const results = await basket
      .find({})
      .map((basket) => ({ ...basket, _id: basket._id.toString() }))
      .toArray();
      return ({ baskets: results });
    } catch (error) {
      return { error: "An error occured" };
    }
  };

  const getBasketById = async (user_id) => {
    try {
      const client = await clientPromise;
      const db = await client.db();
      const basketCollection = await db.collection("basket");
  
      const result = await basketCollection.findOne({
        user_id: parseInt(user_id)
      });
      return result;  
    } catch (error) {
      console.error(error);
      return null;  
    }
  };

  const patchBasket = async (user_id, updateData) => {
    try {
      const client = await clientPromise;
      const db = await client.db();
  
      // Validate updateData
      const validation = new BasketPatch(updateData);
      await validation.validate();
  
      const basketCollection = db.collection("basket");
  
      const newBasket = await basketCollection.findOne({
        user_id: parseInt(user_id)
      });
  
      if (!newBasket) {
        throw new Error('Basket not found');
      }
  
      // Ensure updateData.ingredients is an array
      const ingredients = Array.isArray(updateData.ingredients) ? updateData.ingredients : [];
  
      newBasket.ingredients = [...newBasket.ingredients, ...ingredients];
  
      const result = await basketCollection.updateOne(
        { user_id: parseInt(user_id) },
        { $set: newBasket }
      );
  
      if (result.matchedCount === 0) {
        return null;  
      }
  
      return newBasket;  
    } catch (err) {
      console.error(err);
      return null;  
    }
  };
  
module.exports = {getBasketById, getAllBaskets, patchBasket}
