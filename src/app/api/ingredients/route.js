import { getIngredients } from "controller/ingredientController";

import { NextResponse } from "next/server";

export async function GET() {
  return getIngredients().then((ingredients) => {
    return NextResponse.json(ingredients, { status: 200 });
  });
}
