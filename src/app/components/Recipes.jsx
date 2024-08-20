import Link from "next/link";
import recipeData from "../../../db/data/test/recipeTestData";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function Recipes() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 m-8">
      {recipeData.map((recipe) => {
        return (
          <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={recipe.title}
          >
            {/* img has a link  */}
            <Link href="/single-recipe">
              <img className="rounded-t-lg" src={recipe.photo_url} alt="" />
            </Link>
            {/* no link needed below here  */}
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

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
  className="size-5"
>
  <path
    fillRule="evenodd"
    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
    clipRule="evenodd"
  />
</svg>; */
}
