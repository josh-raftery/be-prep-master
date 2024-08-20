import { NextResponse } from 'next/server';
import { getRecipes } from '../../../../controller/recipeController';
export async function GET () {
    return getRecipes()
    .then((recipes) => {
        console.log(recipes)
        return NextResponse.json({recipes}, {status:200})
    })
}