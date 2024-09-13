import { NextResponse } from "next/server";
import {
  getRecipes,
  postRecipe,
} from "../../../../controller/recipeController";

export async function GET(request) {
  console.log('TEST TEST TEST')
  const name = request.nextUrl.searchParams.get("title") || null;
  const orderBy = request.nextUrl.searchParams.get("order_by") || "1";
  const sortBy = request.nextUrl.searchParams.get("sort_by") || "recipe_id";
  const chef = request.nextUrl.searchParams.get("chef") || null;
  const prepTime = request.nextUrl.searchParams.get("preparation_time_minutes");
  const servings = request.nextUrl.searchParams.get("serves")
  const mealType = request.nextUrl.searchParams.get("mealType")

  return getRecipes(name, orderBy, sortBy, chef, prepTime, servings, mealType)
  .then((response) => {
    console.log(response, ' fdfdsfdresp')
    console.error(response, 'resp fdsdfsd')
    throw response
  })
  .catch((err) => {
    console.log(err)
    console.error(err)
    throw err
  })
}

export async function POST(request) {
  const body = await request.json();
  return postRecipe(body);
}
