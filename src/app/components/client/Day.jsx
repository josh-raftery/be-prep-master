"use client";

import { addMeal, getRecipeById } from "api";
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import Link from "next/link";
import calculateNutrition from "src/utils/calculateNutrition";
import { FaBullseye } from "react-icons/fa";

export default function Day({
  diff,
  day,
  date,
  mealPlan,
  today,
  popUp,
  setServingsToAllocate,
  servingsToAllocate,
  recipeToAdd,
  user_id,
  setClicked,
  newMeals,
  setNewMeals,
  cleared,
  setCleared
}) {
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [todaysRecipes, setTodaysRecipes] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [todaysBreakfast, setTodaysBreakfast] = useState([]);
  const [todaysLunch, setTodaysLunch] = useState([]);
  const [todaysDinner, setTodaysDinner] = useState([]);
  const [todaysSnacks, setTodaysSnacks] = useState([]);
  const [todaysDessert, setTodaysDessert] = useState([]);
  const [nutrition, setNutrition] = useState({
    fat: 0,
    calories: 0,
    carbs: 0,
    protein: 0,
    salt: 0,
    sugar: 0,
  });

  function addToPopUp(mealType, recipe) {
    if (mealType === "breakfast") {
      setTodaysBreakfast((currBreakfast) => {
        return [...currBreakfast, recipe];
      });
    }
    if (mealType === "lunch") {
      setTodaysLunch((currLunch) => {
        return [...currLunch, recipe];
      });
    }
    if (mealType === "dinner") {
      setTodaysDinner((currDinner) => {
        return [...currDinner, recipe];
      });
    }
    if (mealType === "snack") {
      setTodaysSnacks((currSnacks) => {
        return [...currSnacks, recipe];
      });
    }
    if (mealType === "dessert") {
      setTodaysDessert((currDessert) => {
        return [...currDessert, recipe];
      });
    }
  }

  useEffect(() => {
    const todaysMealsInput = mealPlan.meals.filter((meal) => {
      if (meal.date === date) {
        return meal;
      }
    });
    setTodaysMeals(todaysMealsInput);
  }, [cleared]);

  useEffect(() => {
    const promisesArray = todaysMeals.map((meal) => {
      return getRecipeById(meal.recipe_id);
    });
    Promise.all(promisesArray).then((recipes) => {
      recipes.forEach((recipe, index) => {
        addToPopUp(todaysMeals[index].mealType, recipe);
      });
      setTodaysRecipes(recipes);
      setHasFetched(true);
      const currNutrition = calculateNutrition(recipes);
      setNutrition(currNutrition);
      if(!popUp){
        setCleared(false)
      }
    });
  }, [todaysMeals]);

  if (!hasFetched) {
    return <Loading />;
  }

  function handleClick(mealInfo) {
    addToPopUp(mealInfo.mealType, recipeToAdd);
    setTodaysRecipes((currRecipes) => {
      return [...currRecipes, recipeToAdd];
    });
    setNewMeals((currMeals) => {
      return [
        ...currMeals,
        {
          ...mealInfo,
          recipe_id: recipeToAdd.recipe_id,
        },
      ];
    });
    setServingsToAllocate((currServings) => {
      return currServings - 1;
    });
  }

  if (hasFetched && !cleared) {
    if (popUp) {
      return (
        <div style={{marginRight: "0.7rem"}} className="add-to-mealplan">
          <div className="card bg-primary text-primary-content w-80">
            <div className="card-body">
              <h2 className="card-title">{`${day}, ${date}`}</h2>
              <div className="checkbox-container">
                <h3 style={{ marginTop: "1rem" }} className="card-title">
                  Breakfast:
                </h3>
                <input
                  onClick={() => {
                    handleClick({ mealType: "breakfast", date });
                  }}
                  style={{ marginLeft: "150px", marginTop: "1.2rem" }}
                  type="checkbox"
                  className="checkbox-custom checkbox"
                />
              </div>
              {todaysBreakfast.length > 0 ? (
                todaysBreakfast.map((breakfast) => {
                  return <p>{breakfast.title}</p>;
                })
              ) : (
                <p>No breakfast</p>
              )}
              <div className="checkbox-container">
                <h3 style={{ marginTop: "1rem" }} className="card-title">
                  Lunch:
                </h3>
                <input
                  onClick={() => {
                    handleClick({ mealType: "lunch", date });
                  }}
                  style={{ marginLeft: "185px", marginTop: "1.2rem" }}
                  type="checkbox"
                  className="checkbox-custom checkbox"
                />
              </div>

              {todaysLunch.length > 0 ? (
                todaysLunch.map((lunch) => {
                  return <p>{lunch.title}</p>;
                })
              ) : (
                <p>No Lunch</p>
              )}
              <div className="checkbox-container">
                <h3 style={{ marginTop: "1rem" }} className="card-title">
                  Dinner:
                </h3>
                <input
                  onClick={() => {
                    handleClick({ mealType: "dinner", date });
                  }}
                  style={{ marginLeft: "177px", marginTop: "1.2rem" }}
                  type="checkbox"
                  className="checkbox-custom checkbox"
                />
              </div>
              {todaysDinner.length > 0 ? (
                todaysDinner.map((dinner) => {
                  return <p>{dinner.title}</p>;
                })
              ) : (
                <p>No Dinner</p>
              )}
              <div className="checkbox-container">
                <h3 style={{ marginTop: "1rem" }} className="card-title">
                  Snacks:
                </h3>
                <input
                  onClick={() => {
                    handleClick({ mealType: "snack", date });
                  }}
                  style={{ marginLeft: "177px", marginTop: "1.2rem" }}
                  type="checkbox"
                  className="checkbox-custom checkbox"
                />
              </div>
              {todaysSnacks.length > 0 ? (
                todaysSnacks.map((snack) => {
                  return <p>{snack.title}</p>;
                })
              ) : (
                <p>No Snacks</p>
              )}
              <div className="checkbox-container">
                <h3 style={{ marginTop: "1rem" }} className="card-title">
                  Dessert:
                </h3>
                <input
                  onClick={() => {
                    handleClick({ mealType: "dessert", date });
                  }}
                  style={{ marginLeft: "170px", marginTop: "1.2rem" }}
                  type="checkbox"
                  className="checkbox-custom checkbox"
                />
              </div>
              {todaysDessert.length > 0 ? (
                todaysDessert.map((dessert) => {
                  return <p>{dessert.title}</p>;
                })
              ) : (
                <p>No Dinner</p>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="day-container">
          <div
            className={
              day === today && diff === 0
                ? "collapse bg-base-200 bg-primary"
                : "collapse bg-base-200"
            }
          >
            {day === today && diff === 0 ? (
              <input type="radio" name="my-accordion-1" defaultChecked />
            ) : (
              <input type="radio" name="my-accordion-1" />
            )}
            <div
              className={
                day === today && diff === 0
                  ? "collapse-title bg-primary text-xl font-medium"
                  : "collapse-title text-xl font-medium"
              }
            >
              <p style={{marginLeft: "2.2rem"}} >{day}</p>
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
                                  style={{
                                    width: "25px",
                                    marginRight: "0.5rem",
                                  }}
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
                <p style={{marginLeft: "0.4rem"}} >No meals!</p>
              )}
              {todaysRecipes.length > 0 && (
                <section
                  id="stats-bar"
                  className="recipe-stats flex flex-wrap justify-center gap-4 m-4"
                >
                  <div className="stat bg-accent p-4 m-2 rounded-lg shadow-lg flex flex-col justify-center items-center flex-1 min-w-[150px]">
                    <div className="stat-title text-center">Calories</div>
                    <div className="stat-value text-lg">
                      {nutrition.calories}
                    </div>
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
                    <div className="stat-value text-lg">
                      {nutrition.protein}g
                    </div>
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
}
