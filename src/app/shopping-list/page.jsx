import AddIngredients from "@components/client/AddIngredient";
import IngredientLists from "@components/client/IngredientLists";
import { getAllTodos } from "shopping-list-data/api";

export default async function ShoppingList() {

  const ingredients = await getAllTodos()

  return(
    <main className="p-4">
    <AddIngredients ingredients={ingredients} />
  </main>
  )
}