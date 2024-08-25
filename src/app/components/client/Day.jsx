"use client";

import { getRecipeById } from "api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Link from "next/link";
import calculateNutrition from "src/utils/calculateNutrition";

export default function Day({ day, date, mealPlan, today }) {
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [todaysRecipes, setTodaysRecipes] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [nutrition, setNutrition] = useState({
    fat: 0,
    calories: 0,
    carbs: 0,
    protein: 0,
    salt: 0,
    sugar: 0,
  });

  useEffect(() => {
    const todaysMealsInput = mealPlan.meals.filter((meal) => {
      if (meal.date === date) {
        return meal;
      }
    });
    setTodaysMeals(todaysMealsInput);
  }, []);

  useEffect(() => {
    const promisesArray = todaysMeals.map((meal) => {
      return getRecipeById(meal.recipe_id);
    });
    Promise.all(promisesArray).then((recipes) => {
      setTodaysRecipes(recipes);
      setHasFetched(true);
      const currNutrition = calculateNutrition(recipes);
      setNutrition(currNutrition);
    });
  }, [todaysMeals]);

  if (!hasFetched) {
    return <Loading />;
  }

  if (hasFetched) {
    return (
      <div className="day-container">
        <div
          className={
            day === today
              ? "collapse bg-base-200 bg-primary"
              : "collapse bg-base-200"
          }
        >
          {day === today ? (
            <input type="radio" name="my-accordion-1" defaultChecked />
          ) : (
            <input type="radio" name="my-accordion-1" />
          )}
          <div
            className={
              day === today
                ? "collapse-title bg-primary text-xl font-medium"
                : "collapse-title text-xl font-medium"
            }
          >
            {day}
          </div>
          <div className="collapse-content">
            {todaysRecipes.length > 0 ? (
              todaysRecipes.map((recipe, index) => {
                return (
                  <Link href={`/recipes/${recipe.recipe_id}`}>
                    <div className="accordian-day">
                      <div
                        style={{ marginBottom: "1rem" }}
                        key={`${day}-${recipe.recipe_id}`}
                        className="card lg:card-side bg-base-100 shadow-xl "
                      >
                        <figure>
                          <img src={recipe.photo_url} alt="Album" />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2
                            style={{ textAlign: "center" }}
                            className="card-title"
                          >
                            {todaysMeals[index].mealType}
                          </h2>
                          <p>{recipe.title}</p>
                          <div className="">
                            <div className="badge badge-lg badge-primary">
                              <img
                                style={{ width: "25px", marginRight: "0.5rem" }}
                                src={"chef.png"}
                              />
                              <span>{recipe.chef}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>No meals!</p>
            )}
            {todaysRecipes.length > 0 && (
              <section
              id="stats-bar"
              className="recipe-stats flex flex-wrap justify-center gap-4 m-4"
            >
              <div className="stat bg-accent p-4 m-2 rounded-lg shadow-lg flex flex-col justify-center items-center flex-1 min-w-[150px]">
                <div className="stat-title text-center">Calories</div>
                <div className="stat-value text-lg">{nutrition.calories}</div>
              </div>
              <div className="stat bg-accent p-4 m-2 rounded-lg shadow-lg flex flex-col justify-center items-center flex-1 min-w-[150px]">
                <div className="stat-title text-center">Carbs</div>
                <div className="stat-value text-lg">{nutrition.carbs}g</div>
              </div>
              <div className="stat bg-accent p-4 m-2 rounded-lg shadow-lg flex flex-col justify-center items-center flex-1 min-w-[150px]">
                <div className="stat-title text-center">Fat</div>
                <div className="stat-value text-lg">{nutrition.fat}g</div>
              </div>
              <div className="stat bg-accent p-4 m-2 rounded-lg shadow-lg flex flex-col justify-center items-center flex-1 min-w-[150px]">
                <div className="stat-title text-center">Protein</div>
                <div className="stat-value text-lg">{nutrition.protein}g</div>
              </div>
              <div className="stat bg-accent p-4 m-2 rounded-lg shadow-lg flex flex-col justify-center items-center flex-1 min-w-[150px]">
                <div className="stat-title text-center">Sugar</div>
                <div className="stat-value text-lg">{nutrition.sugar}g</div>
              </div>
              <div className="stat bg-accent p-4 m-2 rounded-lg shadow-lg flex flex-col justify-center items-center flex-1 min-w-[150px]">
                <div className="stat-title text-center">Salt</div>
                <div className="stat-value text-lg">{nutrition.salt}g</div>
              </div>
            </section>
            )}
          </div>
        </div>
      </div>
    );
  }
}
