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
    .then(({ data }) => data.basket)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

function addItem(user_id, newIngredient) {
  return api
    .patch(`/basket/${user_id}`, {
      $push: { ingredients: newIngredient, user_id },
    })
    .then(({ data }) => {
      return data.basket;
    })
    .catch((error) => {
      console.error("Error updating basket data:", error);
      throw error;
    });
}

function editItem(user_id, oldName, newName) {
  return api
    .get(`/basket/${user_id}`)
    .then(({ data }) => {
      const updatedIngredients = data.ingredients.map((ingredient) =>
        ingredient === oldName ? newName : ingredient
      );

      return api
        .put(
          `/basket/${user_id}`,
          {
            ...data,
            ingredients: updatedIngredients,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          return data;
        });
    })
    .catch((error) => {
      console.error("Failed to update item:", error);
    });
}

function deleteItem(user_id, nameToDelete) {
  return api
    .get(`/basket/${user_id}`)
    .then(({ data }) => {
      const updatedIngredients = data.ingredients.filter(
        (ingredient) => ingredient !== nameToDelete
      );

      return api
        .put(`/basket/${user_id}`, {
          ...data,
          ingredients: updatedIngredients,
        })
        .then(({ data }) => {
          return data;
        });
    })
    .catch((error) => {
      console.error("Failed to delete item:", error);
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

// function getBasket(user_id){
// return api.get(`/basket/${user_id}`)
// .then(({data}) => {
//   return data.basket
// })
// }

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
