import { addToMealPlan, deleteFromMealPlan, getMealPlan, postMealPlan } from "../../../../../controller/mealPlanController";

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
    if(add === 'true'){
        console.log('api route')
        return addToMealPlan(updateData,user_id)
    }else if(add === 'false'){
        console.log('api route')
        return deleteFromMealPlan(updateData,user_id)
    }
}

export async function POST(request){
    const splitUrl = request.url.split('/')
    const user_id = splitUrl[splitUrl.length - 1]
    const updateData = await request.json();
    return postMealPlan(user_id,updateData)
}