import React from "react";
import RootLayout from "src/app/layout";
import Image from "next/image";
import AddToMealPlan from "@components/client/AddToMealplan";



export default async function SingleRecipe({ params }) {
  const { recipe_id } = params;
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;
  const res = await fetch(`http://${host}:${port}/api/recipes/${params.recipe_id}`);
  const responseData = await res.json();
  const recipe = responseData.recipe;

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div>
      {/* <AddToMealPlan recipe={recipe}/> */}
      {/* Main flex container */}
      <div className="flex flex-col lg:flex-col m-4 gap-8 max-w-7xl mx-auto">
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
          <div className="card-actions justify-end">
                  <button className="btn bg-secondary mt-4"><Image
                src="/heartIcon.png"
                alt="heart icon"
                width={20}
                height={20}
              />
                    + Favourites
                  </button>
                </div>
        </section>

        {/* Stats Bar Section */}
        <section
          id="stats-bar"
          className="recipe-stats flex flex-col lg:flex-row gap-4 lg:gap-8 m-4"
        >
          <div className="stat bg-primary flex-1 p-4 m-2 rounded-lg shadow-lg">
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
          <div className="stat bg-secondary flex-1 p-4 m-2 rounded-lg shadow-lg">
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
          <div className="stat bg-accent flex-1 p-4 m-2 rounded-lg shadow-lg">
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
        <div className="flex flex-col lg:flex-row gap-4 m-4">
          <section id="recipe-ingredients" className="flex-1">
            <div className="card bg-primary text-primary-content p-4 rounded-lg shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Ingredients</h2>
                <ul className="list-disc pl-6">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <div className="card-actions justify-end">
                  <button className="btn bg-secondary mt-4">
                    + Shopping List
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="recipe-method" className="flex-1">
            <div className="card bg-accent text-primary-content p-4 rounded-lg shadow-lg">
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
