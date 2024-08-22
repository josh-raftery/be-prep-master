import { getIngredientsById } from "controller/ingredientController";

export async function GET(request) {
  const splitUrl = request.url.split("/");
  const ingredient_id = splitUrl[splitUrl.length - 1];
  return getIngredientsById(ingredient_id);
}
