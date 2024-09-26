import { getUsersById, patchUser, addToMyRecipes, patchUserBasket } from 'controller/usersController';

export async function GET (request) {
    const splitUrl = request.url.split('/')
    const user_id = splitUrl[splitUrl.length - 1]
    return getUsersById(user_id)
}

export async function PATCH(request) {
    try {
      const url = new URL(request.url);
      const splitUrl = url.pathname.split('/')
      const user_id = splitUrl[splitUrl.length - 1]
      const updateData = await request.json()
      const myrecipes = request.nextUrl.searchParams.get("myrecipes")
      const basket = request.nextUrl.searchParams.get("basket")
    
      if(myrecipes === 'true'){
        return addToMyRecipes(user_id, updateData)
      }

      if(basket){
        return patchUserBasket(user_id, updateData)
      }


      }catch (error) {
          console.log(error)
        }}
     
  