import { NextResponse } from "next/server";
import {
  getRecipes,
  postRecipe,
} from "../../../../controller/recipeController";

export async function GET(request) {
  try{
  const title = request.nextUrl.searchParams.get("title") || null;
  const order_by = request.nextUrl.searchParams.get("order_by") || "1";
  const sort_by = request.nextUrl.searchParams.get("sort_by") || "recipe_id";
  const chef = request.nextUrl.searchParams.get("chef") || null;
  const preparation_time_minutes = request.nextUrl.searchParams.get("preparation_time_minutes");
  const serves = request.nextUrl.searchParams.get("serves");
  const mealType = request.nextUrl.searchParams.get("mealType");

    return getRecipes({
      query: {
          title,
        order_by,
        sort_by,
        chef,
        preparation_time_minutes,
        serves,
        mealType,

      }
    })
  }
 catch(err){
   return NextResponse.json(
     { error: "Failed to fetch recipes" },
     { status: 500 }
   );
 }
}

export async function POST(request) {
  const body = await request.json();
  return postRecipe(body);
}
