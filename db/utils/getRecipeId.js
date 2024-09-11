const { default: axios } = require("axios");
// const host = process.env.HOST || "localhost";
// const port = process.env.PORT || 3000;
const baseUrl = process.env.API_URL

function getRecipeId() {
  return axios
    .get(`${baseUrl}/api/recipes`)
    .then((response) => {
      const recipe_ids = response.data.recipes.map((recipe) => {
        return recipe.recipe_id
      })
      const highestId = Math.max(...recipe_ids)
      return highestId + 1
    })
    .catch((err) => {
      console.log(err, " axios err ");
    });
}
module.exports = { getRecipeId };
