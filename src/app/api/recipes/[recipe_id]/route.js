import { getRecipeById,patchRecipe } from "../../../../../controller/recipeController";

export async function GET (request) {
    const splitUrl = request.url.split('/')
    const recipe_id = splitUrl[splitUrl.length - 1]
    return getRecipeById(recipe_id)
}

export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const splitUrl = url.pathname.split("/");
    const recipe_id = splitUrl[splitUrl.length - 1];

    const updateData = await request.json();

    return await patchRecipe(recipe_id, updateData);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}