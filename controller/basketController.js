const { NextResponse } = require("next/server");
const clientPromise = require("../connection");
const Basket = require("../models/basketSchema");


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
      const basketCollection = db.collection("basket");
      const basketUpdate = updateData.basket;
      const userId = parseInt(user_id);
      const validation = new Basket(basketUpdate);
      await validation.validate();
  
      const result = await basketCollection.updateOne(
        { user_id: userId },
        { $set: basketUpdate })

    if (result.matchedCount === 0) {
        return null;  
      }
  
      const updatedBasket = await basketCollection.findOne({ user_id: userId });
      console.log(updatedBasket)
      return updatedBasket;  
    } catch (err) {
      console.error(err);
      return null;  
      }
    }

module.exports = {getBasketById, getAllBaskets, patchBasket}
