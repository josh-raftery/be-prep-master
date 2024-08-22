import React from "react";
import RootLayout from "src/app/layout";
import Image from "next/image";

export default async function SingleRecipe({ params }) {
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;

  const res = await fetch(
    `http://${host}:${port}/api/recipes/${params.recipe_id}`,
    {
      cache: "no-store",
    }
  );
  const responseData = await res.json();
  const recipe = responseData.recipe;

  return (
    <RootLayout>
      <section className="hero bg-base-200 lg:h-[600px] sm:h-[400px] m-4" id="hero-recipe">
        <div className="hero-content flex flex-col lg:flex-row items-center lg:items-start lg:justify-between text-center lg:text-left max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <img
              src={recipe.photo_url}
              alt={recipe.title}
              className="rounded-lg shadow-2xl w-full lg:max-w-sm"
              width={500}
              height={400}
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <h1 className="text-3xl lg:text-5xl font-bold">{recipe.title}</h1>
            <h2 className="text-xl lg:text-2xl mt-2">{recipe.chef}</h2>
            <p className="py-6">{recipe.description}</p>
          </div>
        </div>
      </section>
      <section id="stats-bar" className="recipe-stats mt-8 px-4 lg:px-0 max-w-7xl mx-auto m-4">
        <div className="stats flex flex-col lg:flex-row shadow">
          <div className="stat bg-primary flex-1 p-4 m-2">
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
          <div className="stat bg-secondary flex-1 p-4 m-2">
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
          <div className="stat bg-accent flex-1 p-4 m-2">
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
        </div>
      </section>
      <section id="recipe-ingredients">
        <div className="card bg-accent text-primary-content w-96 flex flex-col m-4">
          <div className="card-body">
            <h2 className="card-title">Ingredients</h2>
              {recipe.ingredients.map(()=>{

              })}
              <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn">+ Shopping List</button>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
