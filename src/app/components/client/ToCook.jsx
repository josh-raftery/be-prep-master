"use client";

import { getRecipes } from "api";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const ToCook = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes().then((data) => {
      const cookedStatus =
        JSON.parse(localStorage.getItem("cookedStatus")) || {};

      const updatedData = data.map((element) => ({
        ...element,
        cooked: cookedStatus[element.recipe_id] || false,
      }));

      setRecipes(updatedData);
    });
    setLoading(false);
  }, []);

  const Cooked = (recipeId) => {
    setRecipes((currRecipes) =>
      currRecipes.map((ele) => {
        if (ele.recipe_id === recipeId) {
          return { ...ele, cooked: true };
        } else {
          return ele;
        }
      })
    );
    const updatedStats = {
      ...JSON.parse(localStorage.getItem("cookedStatus")),
      [recipeId]: true,
    };
    localStorage.setItem("cookedStatus", JSON.stringify(updatedStats));
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <h1 className="mt-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 text-center">
        Cooking Progress
      </h1>
      {/* Trying to make a bar */}
      <div className="text-center mb-6">
        <div className="relative pt-1">
          {/* PB container */}
          <div className="relative w-full bg-gray-200 rounded-full h-4">
            {/* BG of the bar*/}
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{
                width: `${
                  (recipes.filter((rec) => rec.cooked).length /
                    recipes.length) *
                  100
                }%`,
              }}
            ></div>
            {/* Progress Percentage */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-gray-700"
              style={{
                width: `${
                  (recipes.filter((rec) => rec.cooked).length /
                    recipes.length) *
                  100
                }%`,
              }}
            >
              {Math.round(
                (recipes.filter((rec) => rec.cooked).length / recipes.length) *
                  100
              )}
              %
            </div>
          </div>
        </div>
      </div>

      {/* ends here */}
      <h3 className="text-sm text-center  font-semibold">
        {recipes.filter((rec) => rec.cooked).length} / {recipes.length} meals
        cooked
      </h3>
      <div className="divider"></div>
      <div>
        {recipes.map((recipe) => (
          <div
            className="m-5 card lg:card-side bg-base-100 shadow-xl"
            key={recipe.recipe_id}
          >
            <figure>
              <img src={recipe.photo_url} alt={recipe.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    Cooked(recipe.recipe_id);
                  }}
                >
                  {recipe.cooked ? "Cooked!" : "Mark as Cooked"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToCook;
