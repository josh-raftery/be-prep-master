"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AddToMealPlan from "@components/client/AddToMealplan";
import { getRecipeById } from "api";
import Loading from "@components/client/Loading";
import { addItem } from "shopping-list-data/api";
import { v4 as uuidv4 } from "uuid";

export default function SingleRecipe({ params }) {
  const router = useRouter();
  const [recipe, setRecipe] = useState({});
  const [clicked, setClicked] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getRecipeById(params.recipe_id)
      .then((recipe) => {
        setRecipe(recipe);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err, " err");
      });
  }, []);

  const ingredientArray = recipe.ingredients;

  function handleClick() {
    setClicked((currClicked) => {
      return !currClicked;
    });
  }

  const handleAddToShoppingList = async () => {
    try {
      await Promise.all(
        ingredientArray.map(async (item) => {
          await addItem({
            name: item,
            ingredient_id: uuidv4(),
          });
        })
      );
  
      router.push("/shopping-list");
      router.refresh("/shopping-list");
    } catch (err) {
      console.log(err, " err");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!recipe.recipe_id) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div>
      {clicked && <AddToMealPlan recipe={recipe} />}
      {/* Main flex container */}
      <div className="flex flex-col lg:flex-col gap-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section
          className="hero bg-base-200 flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-12 rounded-lg shadow-lg"
          id="hero-recipe"
        >
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={recipe.photo_url}
              alt={recipe.title}
              className="rounded-lg shadow-2xl w-full"
              width={500}
              height={400}
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 flex-grow">
            <h1 className="text-3xl lg:text-5xl font-bold">{recipe.title}</h1>
            <h2 className="text-xl lg:text-2xl mt-2">{recipe.chef}</h2>
            <p className="py-6">{recipe.description}</p>
          </div>
        </section>
        <div className="card-actions justify-center">
          <button onClick={handleClick} className="btn bg-secondary mt-4">
            + Meal Plan
          </button>
        </div>

        {/* Stats Bar Section */}
        <section
          id="stats-bar"
          className="recipe-stats flex flex-col sm:flex-row gap-2 sm:gap-2 m-4"
        >
          <div className="stat bg-primary flex-1 rounded-lg shadow-lg">
            <div className="stat-title">Total Prep Time</div>
            <div className="stat-value flex items-center text-lg">
              <Image
                src="/clockIcon.png"
                alt="clock icon"
                width={50}
                height={50}
              />
              <span className="ml-2">
                {`${recipe.preparation_time_minutes} mins`}
              </span>
            </div>
          </div>
          <div className="stat bg-secondary flex-1 rounded-lg shadow-lg">
            <div className="stat-title">Serves</div>
            <div className="stat-value flex items-center text-lg">
              <Image
                src="/servesIcon.png"
                alt="serving size icon"
                width={50}
                height={50}
              />
              <span className="ml-2">{recipe.serves}</span>
            </div>
          </div>
          <div className="stat bg-accent flex-1 rounded-lg shadow-lg">
            <div className="stat-title">Calories</div>
            <div className="stat-value flex items-center text-lg">
              <Image
                src="/caloriesIcon.png"
                alt="calories icon"
                width={50}
                height={50}
              />
              <span className="ml-2">{recipe.kcal}</span>
            </div>
          </div>
        </section>

        {/* Ingredients and Method Section */}
        <div className="flex flex-col lg:flex-row">
          <section id="recipe-ingredients" className="flex-1 m-4">
            <div className="card bg-primary text-primary-content  rounded-lg shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Ingredients</h2>
                <ul className="list-disc pl-6">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <div className="card-actions justify-end">
                  <button
                    onClick={handleAddToShoppingList}
                    className="btn bg-secondary mt-4"
                  >
                    + Shopping List
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section id="recipe-method" className="flex-1">
            <div className="card bg-accent text-primary-content rounded-lg shadow-lg m-4">
              <div className="card-body">
                <h2 className="card-title">Method</h2>
                <ul className="list-disc pl-6">
                  {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
