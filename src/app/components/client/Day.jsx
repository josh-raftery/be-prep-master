"use client";

import { getRecipeById } from "api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Day({ day, date, mealPlan }) {
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [todaysRecipes, setTodaysRecipes] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [calories, setCalories] = useState(0);

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
      const caloriesInput = recipes.reduce((accumulator, curr) => accumulator + (curr.kcal / curr.serves),0) // need to check
      console.log(caloriesInput, ' <-----')
      setCalories(caloriesInput)
    });
  }, [todaysMeals]);

  if (!hasFetched) {
    return <Loading />;
  }

  if (hasFetched) {
    console.log(todaysRecipes);
    return (
      <div>
        <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title text-xl font-medium">{day}</div>
          <div className="collapse-content">
            {todaysRecipes.length > 0 ? (
              todaysRecipes.map((recipe, index) => {
                return (
                  <div className="accordian-day">
                    <div
                      style={{ marginBottom: "1rem" }}
                      key={`${day}-${recipe.recipe_id}`}
                      className="card lg:card-side bg-base-100 shadow-xl"
                    >
                      <figure>
                        <img src={recipe.photo_url} alt="Album" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">
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
                          <div
                            style={{ marginLeft: "1rem" }}
                            className="badge badge-lg badge-secondary"
                          >
                            <ClockIcon className="w-5 h-5 mr-2" />
                            <span>{`${recipe.preparation_time_minutes} minutes`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No meals!</p>
            )}
            {todaysRecipes.length > 0 && <section
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
                  <span className="ml-2">{`50 mins`}</span>
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
                  <span className="ml-2">50</span>
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
                  <span className="ml-2">{calories}</span>
                </div>
              </div>
            </section>}
          </div>
        </div>
      </div>
    );
  }
}
