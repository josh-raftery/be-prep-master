const { default: axios } = require("axios");
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const baseUrl = `https://be-prep-master.vercel.app/api`;

function getRecipeId() {
  return axios
    .get(`${baseUrl}/recipes`)
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
