import { addToMealPlan, getMealPlan } from "../../../../../controller/mealPlanController";

export async function GET (request) {
    const splitUrl = request.url.split('/')
    const user_id = splitUrl[splitUrl.length - 1]
    return getMealPlan(user_id)
}

export async function PATCH(request){
    const splitUrl = request.url.split('/')
    const user_id = splitUrl[splitUrl.length - 1]
    const updateData = await request.json();
    const add = request.nextUrl.searchParams.get("add")
    if(add){
        return addToMealPlan(updateData,user_id)
    }else{
        // return deleteFromMealPlan
    }
}