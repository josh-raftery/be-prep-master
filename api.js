const { default: axios } = require("axios");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const baseUrl = process.env.API_URL

const api = axios.create({
  baseURL: baseUrl,
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomRecipe(params = {}){
  return api.get(`/recipes`, {params})
  .then(({data}) => {
    return data.recipes[getRandomInt(data.recipes.length - 1)]
  })
}

function deleteMeal(user_id,request){
  console.log(request, ' request')
  return api.patch(`/mealplan/${user_id}?add=false`,{meals: request})
}

function getRecipes(params) {
  return api.get("/recipes", { params }).then(({ data }) => {
    return data.recipes;
  });
}

function getMealPlan(user_id) {
  return api.get(`/mealplan/${user_id}`).then(({ data }) => {
    return data.user;
  });
}

function getRecipeById(recipe_id) {
  return api.get(`/recipes/${recipe_id}`).then(({ data }) => {
    return data.recipe;
  });
}

function postUser(request) {
  return api.post(`/users`, request).then(({ data }) => {
    return data.user;
  });
}

function postRecipe(request) {
  return api.post(`/recipes`, request).then(({ data }) => {
    return data.recipe;
  });
}

function addMeal(user_id,request){
  return api.patch(`/mealplan/${user_id}?add=true`,{meals: request})
  .then((response) => {
    console.log(response)
  })
}

function patchUserMyRecipes(user_id, request){
  return api.patch(`/users/${user_id}?myrecipes=true`, {my_recipes: request}).then((response) => {
    console.log(response)
  })
}

function getUserByUsername(username) {

  return api.get(`/users`, { params: { username } })  
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching user by username:", error);
      throw error;
    });
}

module.exports = {
  getRecipes,
  getRecipes,
  getMealPlan,
  getRecipeById,
  postUser,
  postRecipe,
  addMeal,
  patchUserMyRecipes,
  getRandomRecipe,
  deleteMeal,
  getUserByUsername
};
