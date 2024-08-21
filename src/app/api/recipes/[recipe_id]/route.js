import { NextResponse } from "next/server";
import { getRecipeById } from "../../../../../controller/recipeController";

export async function GET (request) {
    const splitUrl = request.url.split('/')
    const recipe_id = splitUrl[splitUrl.length - 1]
    return getRecipeById(recipe_id)
}