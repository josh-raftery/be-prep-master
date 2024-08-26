"use client"
import AddIngredients from "@components/client/AddIngredient";
import { getBasket } from "api";
import { useEffect, useState } from "react";

export default function ShoppingList({ params }) {
  const { user_id } = params;
  const [shoppingList, setShoppingList] = useState({ ingredients: [] });

  useEffect(() => {
    getBasket(user_id)
      .then((basket) => {
        setShoppingList(basket);
      })
      .catch((error) => {
        console.error("Error fetching basket:", error);
      });
  }, [user_id]);

  return (
    <main className="p-4">
      <AddIngredients user_id={user_id} ingredients={shoppingList.ingredients} />
    </main>
  );
}
