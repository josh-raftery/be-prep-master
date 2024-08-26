"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@components/client/userProvider";
import { postRecipe } from "api";

export default function AddRecipe() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    chef: "",
    description: "",
    ingredients: "",
    instructions: "",
    preparation_time_minutes: "",
    cooking_time_minutes: "",
    photo_url: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map(item => item.trim()), 
      instructions: formData.instructions.split(",").map(item => item.trim()), 
      chef: user.username,
    };

    postRecipe(recipeData)
      .then((newRecipe) => {
        router.push(`/recipes/${newRecipe.recipe_id}`); 
      })
      .catch((error) => {
        setError("An error occurred while adding the recipe.");
        console.error(error);
      });

    setFormData({
      title: "",
      chef: "",
      description: "",
      ingredients: "",
      instructions: "",
      preparation_time_minutes: "",
      cooking_time_minutes: "",
      photo_url: "",
    });
  }

  return (
    <>
    <container className="flex flex-col items-center pb-10 m-4">
      <div className="card bg-white w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Recipe</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form className="form-control" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Recipe Title"
              className="input input-bordered w-full max-w-xs m-4"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="input input-bordered w-full max-w-xs m-4"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Ingredients (comma separated)"
              className="input input-bordered w-full input-lg max-w-xs m-4"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Instructions (comma separated)"
              className="input input-bordered w-full input-lg max-w-xs m-4"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
            />
             <input
              type="text"
              placeholder="Servings"
              className="input input-bordered w-full max-w-xs m-4"
              name="chef"
              value={formData.serves}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Prep Time (mins)"
              className="input input-bordered w-full max-w-xs m-4"
              name="preparation_time_minutes"
              value={formData.preparation_time_minutes}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Cooking Time (mins)"
              className="input input-bordered w-full max-w-xs m-4"
              name="cooking_time_minutes"
              value={formData.cooking_time_minutes}
              onChange={handleChange}
            />
            <input
              type="url"
              placeholder="Photo URL"
              className="input input-bordered w-full max-w-xs m-4"
              name="photo_url"
              value={formData.photo_url}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary m-4">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
      </container>
    </>
  );
}
