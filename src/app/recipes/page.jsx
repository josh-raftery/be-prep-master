import Link from "next/link";
import recipeData from "../../../db/data/test/recipeTestData";
import { ClockIcon } from "@heroicons/react/24/outline";
import SearchBar from "../components/server/SearchBar";
import { getRecipes } from "api";

export default async function Recipes() {

  const  allRecipes = await getRecipes()

  return (
    <>
    <SearchBar/>
    <container className="recipe-card-container">
    <section className="grid gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {allRecipes.map((recipe) => {
        return (
          <Link href={`/recipes/${recipe.recipe_id}`} key={recipe.recipe_id}>
          <div
            className="card flex-1 h-full bg-base-100 shadow-xl h-5000"
          >
            <figure>
              <img
                src={recipe.photo_url}
                alt={`Image of ${recipe.recipe_id}`}
              />
            </figure>
            <div  className="card-body">
              <h2 className="card-title"> {recipe.title}</h2>
              <div className="card-actions justify-end">
                <div className="recipe-info" >
                  <div  className="badge badge-lg badge-primary">
                    <img style={{width: '25px', marginRight: "0.5rem"}} src={'chef.png'} />
                    <span>{recipe.chef}</span>
                  </div>
                  <div style={{marginLeft: "1rem" }} className="badge badge-lg badge-secondary">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>{`${recipe.preparation_time_minutes} minutes`}</span>
                  </div>

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
