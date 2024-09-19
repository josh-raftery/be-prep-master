import { NextResponse } from "next/server";
import {
  getRecipeById,
  patchRecipe,
  deleteRecipe,
} from "../../../../../controller/recipeController";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const splitUrl = url.pathname.split("/");
    const recipe_id = splitUrl[splitUrl.length - 1];

    return await getRecipeById({ query: { recipe_id } });
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const splitUrl = url.pathname.split("/");
    const recipe_id = splitUrl[splitUrl.length - 1];

    const updateData = await request.json();

    return await patchRecipe({ query: { recipe_id }, body: updateData });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const splitUrl = url.pathname.split("/");
    const recipe_id = splitUrl[splitUrl.length - 1];

    return await deleteRecipe({ query: { recipe_id } });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 400 }
    );
  }
}
