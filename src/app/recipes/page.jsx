"use client";

import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import SearchBar from "../components/client/SearchBar";
import { getRecipes } from "api";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    getRecipes().then((recipes) => {
      setAllRecipes(recipes);
    });
  }, []);

  if (allRecipes.length > 0) {
    return (
      <>
        <SearchBar />
        <div className="recipe-card-container">
          <section className="grid gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-auto">
            {allRecipes.map((recipe) => {
              return (
                <Link
                  href={`/recipes/${recipe.recipe_id}`}
                  key={recipe.recipe_id}
                >
                  <div className="card flex-1 h-full bg-base-100 shadow-xl h-5000 ">
                    <figure>
                      <img
                        src={recipe.photo_url}
                        alt={`Image of ${recipe.recipe_id}`}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title"> {recipe.title}</h2>
                      <div className="card-actions justify-end">
                        <div className="recipe-info">
                          <div className="badge badge-primary flex items-center">
                            <img
                              className="w-6 h-6 mr-2"
                              src="chef.png"
                              alt="chef"
                            />
                            <span className="truncate">{recipe.chef}</span>
                          </div>

                          <div className="badge badge-secondary flex items-center ml-4">
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
        </div>
      </>
    );
  }
}
