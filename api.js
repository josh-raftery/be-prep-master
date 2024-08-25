const { default: axios } = require("axios");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const baseUrl = `http://${host}:${port}/api`;

const api = axios.create({
  baseURL: baseUrl,
});

function getRecipes(params){
  return api.get('/recipes',{params})
  .then(({ data }) => {
    return data.recipes;
  })
}

function getMealPlan(user_id){
    return api.get(`/mealplan/${user_id}`)
    .then(({data}) => {
        return data.user
    })
}




module.exports = {getRecipes,getMealPlan}