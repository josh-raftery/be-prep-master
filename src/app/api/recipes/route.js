import { NextResponse } from "next/server";
import {
  getRecipes,
  postRecipe,
} from "../../../../controller/recipeController";

export async function GET(request) {
  const name = request.nextUrl.searchParams.get("title") || null;
  const orderBy = request.nextUrl.searchParams.get("order_by") || "1";
  const sortBy = request.nextUrl.searchParams.get("sort_by") || "recipe_id";
  const chef = request.nextUrl.searchParams.get("chef") || null;
  const prepTime = request.nextUrl.searchParams.get("preparation_time_minutes");
  const servings = request.nextUrl.searchParams.get("serves");
  const mealType = request.nextUrl.searchParams.get("mealType");

  return getRecipes(name, orderBy, sortBy, chef, prepTime, servings, mealType)
    .then((recipes) => {
      return NextResponse.json(recipes, { status: 200 });
    })
    .catch((err) => {
      console.log(err, "RECIPE ERROR");
    });
}

export async function POST(request) {
  const body = await request.json();
  return postRecipe(body);
}
