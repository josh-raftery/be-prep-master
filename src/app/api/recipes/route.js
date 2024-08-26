import { NextResponse } from "next/server";
import {
  getRecipes,
  postRecipe,
} from "../../../../controller/recipeController";

export async function GET(request) {
 const name = request.nextUrl.searchParams.get("title") || null;
 const orderBy = request.nextUrl.searchParams.get("order_by") || "1";
 const sortBy = request.nextUrl.searchParams.get("sort_by") || "recipe_id";
  return getRecipes(name, orderBy, sortBy).then((recipes) => {
    return NextResponse.json(recipes, { status: 200 });
  }).catch((err)=>{})
}

export async function POST(request) {
  const body = await request.json();
  return postRecipe(body);
}
