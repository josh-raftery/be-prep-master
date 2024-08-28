"use client";

import {  getRecipeById } from "api";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function MealGeneratorDays({
  day,
  date,
  mealPlan,
  setServingsToAllocate,
  servingsToAllocate,
  recipeToAdd,
  setbreakfastServings,
  setNewBreakfasts,
  setlunchServings,
  setNewLunch,
  setdinnerServings,
  setNewDinners,
  setdessertServings,
  setNewDesserts,
  setsnacksServings,
  setNewSnacks
}) {
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [todaysRecipes, setTodaysRecipes] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [todaysBreakfast, setTodaysBreakfast] = useState([]);
  const [todaysLunch, setTodaysLunch] = useState([]);
  const [todaysDinner, setTodaysDinner] = useState([]);
  const [todaysSnacks, setTodaysSnacks] = useState([]);
  const [todaysDessert, setTodaysDessert] = useState([]);

  function addToPopUp(mealType, recipe) {
    const addMealIfNotExists = (currentMeals, setMeals) => {
      const alreadyExists = currentMeals.some(
        (existingRecipe) => existingRecipe.recipe_id === recipe.recipe_id
      );
      if (!alreadyExists) {
        setMeals([...currentMeals, recipe]);
      }
    };
  
    if (mealType === "breakfast") {
      setTodaysBreakfast((currBreakfast) => {
        addMealIfNotExists(currBreakfast, setTodaysBreakfast);
        return currBreakfast;
      });
    }
    if (mealType === "lunch") {
      setTodaysLunch((currLunch) => {
        addMealIfNotExists(currLunch, setTodaysLunch);
        return currLunch;
      });
    }
    if (mealType === "dinner") {
      setTodaysDinner((currDinner) => {
        addMealIfNotExists(currDinner, setTodaysDinner);
        return currDinner;
      });
    }
    if (mealType === "snack") {
      setTodaysSnacks((currSnacks) => {
        addMealIfNotExists(currSnacks, setTodaysSnacks);
        return currSnacks;
      });
    }
    if (mealType === "dessert") {
      setTodaysDessert((currDessert) => {
        addMealIfNotExists(currDessert, setTodaysDessert);
        return currDessert;
      });
    }
  }
  

  useEffect(() => {
    const todaysMealsInput = mealPlan.meals.filter((meal) => {
      if (meal.date === date) {
        return meal;
      }
    });
    setTodaysBreakfast([])
    setTodaysLunch([])
    setTodaysDinner([])
    setTodaysSnacks([])
    setTodaysDessert([])
    setTodaysMeals(todaysMealsInput);
  }, [mealPlan]);

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
    });
  }, [todaysMeals]);

  function handleClick(mealInfo) {
    if (mealInfo.mealType === "breakfast") {
      setbreakfastServings((currServings) => {
        return currServings + 1;
      });
      setNewBreakfasts((currBreakfast) => {
        return [...currBreakfast, mealInfo];
      });
    }
    if (mealInfo.mealType === "lunch") {
      setlunchServings((currServings) => {
        return currServings + 1;
      });
      setNewLunch((currLunch) => {
        return [...currLunch, mealInfo];
      });
    }
    if (mealInfo.mealType === "dinner") {
      setdinnerServings((currServings) => {
        return currServings + 1;
      });
      setNewDinners((currDinner) => {
        return [...currDinner, mealInfo];
      });
    }
    if (mealInfo.mealType === "dessert") {
      setdessertServings((currServings) => {
        return currServings + 1;
      });
      setNewDesserts((currSnacks) => {
        return [...currSnacks, mealInfo];
      });
    }
    if (mealInfo.mealType === "snack") {
      setsnacksServings((currServings) => {
        return currServings + 1;
      });
      setNewSnacks((currDessert) => {
        return [...currDessert, mealInfo];
      });
    }

    if (!hasFetched) {
      return <Loading />;
    }

    // build array of mealtypes to query
    // build array of date, mealType

    //send request to recipes api query my meal type
    //slice first 'x' options
    //add recipe ID to newMeal state
    //send request to mealplan
    //re-render page
  }
  if (hasFetched) {
      return (
        <div className="card bg-primary text-primary-content w-96">
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
                style={{ marginLeft: "250px", marginTop: "1.2rem" }}
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
                style={{ marginLeft: "285px", marginTop: "1.2rem" }}
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
                style={{ marginLeft: "277px", marginTop: "1.2rem" }}
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
                style={{ marginLeft: "277px", marginTop: "1.2rem" }}
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
                style={{ marginLeft: "270px", marginTop: "1.2rem" }}
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
      );
  }
}

