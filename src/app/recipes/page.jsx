import Link from "next/link";
import recipeData from "../../../db/data/test/recipeTestData";
import { ClockIcon } from "@heroicons/react/24/outline";


export default async function Recipes() {
  const res = await fetch('http://localhost:3000/api/recipes', {
    next: { revalidate: 600 }, // Revalidate every 600 seconds - not sure if we need this or not? 
  });
  const responseData = await res.json()
  const allRecipes = responseData.recipes;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 m-10">
      {allRecipes.map((recipe) => {
        return (
          <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={recipe.recipe_id}
          >
            <Link href={`/recipes/${recipe.recipe_id}`}>
              <img
                className="rounded-t-lg"
                src={recipe.photo_url}
                alt={`Image of ${recipe.recipe_id}`}
              />
            </Link>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {recipe.title}
              </h5>
              <div className="flex items-center mt-4 text-gray-600">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span>{`${recipe.preparation_time_minutes} minutes`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

