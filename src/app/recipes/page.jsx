import Link from "next/link";
import recipeData from "../../../db/data/test/recipeTestData";
import { ClockIcon } from "@heroicons/react/24/outline";
import SearchBar from "../components/server/SearchBar";

export default async function Recipes() {
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;

  const res = await fetch(`http://${host}:${port}/api/recipes`, {
    next: { revalidate: 600 }, // Revalidate every 600 seconds - not sure if we need this or not?
  });
  const responseData = await res.json();
  const allRecipes = responseData.recipes;

  return (
    <>
    <SearchBar/>
    <container className="recipe-card-container">
    <section className="grid gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {allRecipes.map((recipe) => {
        return (
          <Link href={`/recipes/${recipe.recipe_id}`} key={recipe.recipe_id}>
          <div
            className="card bg-base-100 w-96 shadow-xl "
          >
            <figure>
              <img
                src={recipe.photo_url}
                alt={`Image of ${recipe.recipe_id}`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title"> {recipe.title}</h2>
              <p>{recipe.chef}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{`${recipe.preparation_time_minutes} minutes`}</span>
                </div>
              </div>
            </div>
          </div>
          </Link>
        );
      })}
    </section>
    </container>
    </>
  );
}
