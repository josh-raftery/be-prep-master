"use client";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@components/client/userProvider";
import { postRecipe, patchUserMyRecipes } from "api";
import { useRouter } from "next/navigation";


export default function AddRecipe() {
  const { user, setUser } = useContext(UserContext)
  const [hasCheckedUser,sethasCheckedUser] = useState(false)
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    chef: "",
    description: "",
    ingredients: "",
    instructions: "",
    serves: "",
    preparation_time_minutes: "",
    cooking_time_minutes: "",
    photo_url: "",
  });
  const [error, setError] = useState(null);

  useEffect(() =>{
    if(user === null){
      router.push('/redirect')
    }else{
      sethasCheckedUser(true)
    }
  },[])

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      chef: user.username,
      cooking_time_minutes: formData.preparation_time_minutes,
    });
  }

  function handleSubmit() {
    if(hasCheckedUser){
    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      instructions: formData.instructions.split(",").map((item) => item.trim()),
    };

    postRecipe(recipeData)
      .then((newRecipe) => {
        router.push(`/recipes/${newRecipe.recipe_id}`);
        patchUserMyRecipes(user.user_id, newRecipe.recipe_id);
      })
      .catch((error) => {
        setError("An error occurred while adding the recipe.");
        console.error(error);
      })

    setFormData({
      title: "",
      chef: "",
      description: "",
      ingredients: "",
      instructions: "",
      serves: "",
      preparation_time_minutes: "",
      cooking_time_minutes: "",
      photo_url: "",
    });
  }}

  return (
    <>
      <section className="flex flex-col items-center pb-10 m-4">
        {/* POst a new rcipe div  */}
        <div className="card bg-white w-96 shadow-xl">
          {/* ---  */}
          <div className="card-body flex flex-col items-center justify-center p-4 ">
            <h2 className="card-title text-center mb-4">Post A New Recipe</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form
              className="form-control  flex flex-col items-center w-full max-w-md"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Recipe Title"
                className="input bg-white input-bordered w-full max-w-xs mb-4"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="input bg-white input-bordered w-full max-w-xs mb-4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Ingredients (comma separated)"
                className="input bg-white input-bordered w-full input-lg max-w-xs mb-4"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Instructions (comma separated)"
                className="input bg-white input-bordered w-full input-lg max-w-xs mb-4"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                placeholder="Servings"
                className="input bg-white input-bordered w-full max-w-xs mb-4"
                name="serves"
                value={formData.serves}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Prep Time (mins)"
                className="input bg-white input-bordered w-full max-w-xs mb-4"
                name="preparation_time_minutes"
                value={formData.preparation_time_minutes}
                onChange={handleChange}
                required
              />
              <input
                type="url"
                placeholder="Photo URL"
                className="input bg-white input-bordered w-full max-w-xs mb-4"
                name="photo_url"
                value={formData.photo_url}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn btn-primary btn-wide mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
