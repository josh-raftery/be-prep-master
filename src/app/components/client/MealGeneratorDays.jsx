"use client";

import { getRecipeById } from "api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Link from "next/link";
import calculateNutrition from "src/utils/calculateNutrition";

export default function MealGeneratorDays({ day, date, mealPlan, setServingsToAllocate, servingsToAllocate, recipeToAdd }) {
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [todaysRecipes, setTodaysRecipes] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [todaysBreakfast, setTodaysBreakfast] = useState([]);
  const [todaysLunch, setTodaysLunch] = useState([])
  const [todaysDinner, setTodaysDinner] = useState([]);
  const [todaysSnacks, setTodaysSnacks] = useState([]);
  const [todaysDessert, setTodaysDessert] = useState([]);
  const [newMeals,setNewMeals] = useState([])

  function addToPopUp(mealType,recipe){
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
    if (mealType === "snacks") {
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
  }, []);

  useEffect(() => {
    const promisesArray = todaysMeals.map((meal) => {
      return getRecipeById(meal.recipe_id);
    });
    Promise.all(promisesArray).then((recipes) => {
      recipes.forEach((recipe, index) => {
        addToPopUp(todaysMeals[index].mealType,recipe)
      });
      setTodaysRecipes(recipes);
      setHasFetched(true);
      const currNutrition = calculateNutrition(recipes);
      setNutrition(currNutrition);
    });
  }, [todaysMeals]);

  if (!hasFetched) {
    return <Loading />;
  }

  function handleClick(mealInfo){
    
    
  }

  if (hasFetched) {
 
      return (

      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
        <h2 className="card-title">{`${day}, ${date}`}</h2>
          <div className="checkbox-container" >
            <h3 style={{ marginTop: "1rem" }} className="card-title">
              Breakfast:
            </h3>
            <input onClick={() => {handleClick({mealType: "breakfast", date })}} style={{marginLeft: "250px", marginTop: "1.2rem"}} type="checkbox" className="checkbox-custom checkbox" />
          </div>
          {todaysBreakfast.length > 0 ? (
            todaysBreakfast.map((breakfast) => {
              return <p>{breakfast.title}</p>
            })
          ) : (
            <p>No breakfast</p>
          )}
          <div className="checkbox-container" >
              <h3 style={{ marginTop: "1rem" }} className="card-title">
                Lunch:
              </h3>
              <input onClick={() => {handleClick({mealType: "lunch", date })}} style={{marginLeft: "285px", marginTop: "1.2rem"}} type="checkbox" className="checkbox-custom checkbox" />
          </div>
            
          {todaysLunch.length > 0 ? (
            todaysLunch.map((lunch) => {
              return <p>{lunch.title}</p>
            })
          ) : (
            <p>No Lunch</p>
          )}
          <div className="checkbox-container" >
            <h3 style={{ marginTop: "1rem" }} className="card-title">
              Dinner:
            </h3>
            <input onClick={() => {handleClick({mealType: "dinner", date })}} style={{marginLeft: "277px", marginTop: "1.2rem"}} type="checkbox" className="checkbox-custom checkbox" />
          </div>
          {todaysDinner.length > 0 ? (
            todaysDinner.map((dinner) => {
              return <p>{dinner.title}</p>
            })
          ) : (
            <p>No Dinner</p>
          )}
          <div className="checkbox-container" >
            <h3 style={{ marginTop: "1rem" }} className="card-title">
              Snacks:
            </h3>
            <input onClick={() => {handleClick({mealType: "snacks", date })}} style={{marginLeft: "277px", marginTop: "1.2rem"}} type="checkbox" className="checkbox-custom checkbox" />
          </div>
          {todaysSnacks.length > 0 ? (
            todaysSnacks.map((snack) => {
              return <p>{snack.title}</p>
            })
          ) : (
            <p>No Snacks</p>
          )}
          <div className="checkbox-container" >
            <h3 style={{ marginTop: "1rem" }} className="card-title">
              Dessert:
            </h3>
            <input onClick={() => {handleClick({mealType: "dessert", date })}} style={{marginLeft: "270px", marginTop: "1.2rem"}} type="checkbox" className="checkbox-custom checkbox" />
          </div>
          {todaysDessert.length > 0 ? (
            todaysDessert.map((dessert) => {
              return <p>{dessert.title}</p>
            })
          ) : (
            <p>No Dinner</p>
          )}
        </div>
      </div>
      )
  }
}

