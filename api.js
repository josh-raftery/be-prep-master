const { default: axios } = require("axios");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const baseUrl = `http://${host}:${port}/api`;

const api = axios.create({
  baseURL: baseUrl,
});

// Existing Functions

function getBasket(user_id) {
  return api
    .get(`/basket/${user_id}`)
    .then(({ data }) => {
      return data.basket;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

function addItem(user_id, newIngredient) {
  console.log(newIngredient)
  return api
    .patch(`/basket/${user_id}`, {
      $push: { ingredients: newIngredient, user_id },
    })
    .then(({ data }) => {
      return data.basket.ingredients;
    })
    .catch((error) => {
      console.error("Error updating basket data:", error);
      throw error;
    });
}

function editItem(user_id, ingredients, oldName, newName) {
  const updatedIngredients = Array.isArray(ingredients)
    ? ingredients.map((ingredient) =>
        ingredient.toLowerCase() === oldName.toLowerCase() ? newName : ingredient
      )
    : [];

    console.log(updatedIngredients)

  return api
    .patch(
      `/basket/${user_id}`,
      {
        ingredients: updatedIngredients,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Failed to update item:", error);
      throw error; 
    });
}




function deleteItem(user_id, ingredients, nameToDelete) {

  const updatedIngredients = Array.isArray(ingredients)
    ? ingredients.filter((ingredient) => ingredient !== nameToDelete)
    : [];

  return api
    .patch(
      `/basket/${user_id}`,
      {
        ingredients: updatedIngredients,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    .then(({ data }) => data) 
    .catch((error) => {
      console.error("Failed to delete item:", error);
      throw error; 
    });
}


// Additional Functions

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



module.exports = {
  getBasket,
  addItem,
  editItem,
  deleteItem,
  getRecipes,
  getRecipes,
  getMealPlan,
  getRecipeById,
  postUser,
  postRecipe,
};
