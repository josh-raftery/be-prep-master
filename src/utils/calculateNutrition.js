'use client'
export default function calculateNutrition(recipes){
    let totalFats=0
    let totalCalories=0
    let totalCarbs=0
    let totalProtein=0
    let totalSalt=0
    let totalSugar=0
    let currNutrition = {}

    recipes.forEach((recipe) => {
        if(Number(recipe.fat)) totalFats += recipe.fat
        if(Number(recipe.kcal))totalCalories += recipe.kcal
        if(Number(recipe.carbohydrate))totalCarbs += recipe.carbohydrate
        if(Number(recipe.protein))totalProtein += recipe.protein
        if(Number(recipe.salt))totalSalt += recipe.salt
        if(Number(recipe.sugar))totalSugar += recipe.sugar
    })
    currNutrition.fat = totalFats
    currNutrition.calories = totalCalories
    currNutrition.carbs = totalCarbs
    currNutrition.protein = totalProtein
    currNutrition.salt = totalSalt
    currNutrition.sugar = totalSugar

    return currNutrition

}