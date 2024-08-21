import { NextResponse } from 'next/server';
import { getRecipes } from '../../../../controller/recipeController';
export async function GET (request) {
    const name = request.nextUrl.searchParams.get("title")
    const orderBy = request.nextUrl.searchParams.get("order_by");

    return getRecipes(name, orderBy)
    .then((recipes) => {
        return NextResponse.json(recipes, {status:200})
    })
}
