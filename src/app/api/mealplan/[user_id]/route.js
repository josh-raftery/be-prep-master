import { getMealPlan } from "../../../../../controller/mealPlanController";

export async function GET (request) {
    const splitUrl = request.url.split('/')
    const user_id = splitUrl[splitUrl.length - 1]
    return getMealPlan(user_id)
}