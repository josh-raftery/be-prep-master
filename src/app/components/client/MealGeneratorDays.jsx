"use client";

import { getRandomRecipe, getRecipeById, getRecipes } from "api";
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
  const [newBreakfasts, setNewBreakfasts] = useState([])
  const [newLunch, setNewLunch] = useState([])
  const [newDinners, setNewDinners] = useState([])
  const [newSnacks, setNewSnacks] = useState([])
  const [newDesserts, setNewDesserts] = useState([])
  const [mealQueries,setMealQueries] = useState([])
  const [breakfastServings,setbreakfastServings] = useState(0)
  const [lunchServings,setlunchServings] = useState(0)
  const [dinnerServings,setdinnerServings] = useState(0)
  const [snacksServings,setsnacksServings] = useState(0)
  const [dessertServings,setdessertServings] = useState(0)

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
    });
  }, [todaysMeals]);

  if (!hasFetched) {
    return <Loading />;
  }

  function onSubmit(){
    console.log(breakfastServings, 'breakfast serve')
    console.log(lunchServings, 'lunch serve')
    console.log(dinnerServings, 'dinner serve')
    console.log(snacksServings, 'snack serve')
    console.log(dessertServings, 'dessert serve')

    const queries = []

    // if(breakfastServings){
    //   queries.push(getRandomRecipe({mealType: 'breakfast', serves: breakfastServings}))
    // }

    // if(lunchServings){
    //   queries.push(getRandomRecipe({mealType: 'lunch', serves: lunchServings}))
    // }

    // if(dinnerServings){
    //   queries.push(getRandomRecipe({mealType: 'dinner', serves: dinnerServings}))
    // }

    // if(snacksServings){
    //   queries.push(getRandomRecipe({mealType: 'snack', serves: snacksServings}))
    // }

    // if(dessertServings){
    //   queries.push(getRecipes({mealType: 'dessert', serves: dessertServings}))
    // }

    // Promise.all(queries)
    // .then((recipesArray) => {
    //   recipesArray.forEach((mealTypeArray,typeIndex) => {
    //     mealTypeArray.forEach((recipe,mealIndex) => {
    //       if(typeIndex === 0){ // breakfast
    //         setNewBreakfasts((currBreakfast) => {
    //           currBreakfast[mealIndex].recipe_id = recipe.recipe_id
    //         })
    //       }
    //       if(typeIndex === 1){ // lunch
    //         setNewLunch((currLunch) => {
    //           currLunch[mealIndex].recipe_id = recipe.recipe_id
    //         })
    //       }
    //       if(typeIndex === 2){ // dinner
    //         setNewDinners((currDinner) => {
    //           currDinner[mealIndex].recipe_id = recipe.recipe_id
    //         })
    //       }
    //       if(typeIndex === 3){ // snacks
    //         setNewSnacks((currSnacks) => {
    //           currSnacks[mealIndex].recipe_id = recipe.recipe_id
    //         })
    //       }
    //       if(typeIndex === 4){ // dessert
    //         setNewDesserts((currDessert) => {
    //           currDessert[mealIndex].recipe_id = recipe.recipe_id
    //         })
    //       }
    //     })
    //   })
    // })
  }

  function handleClick(mealInfo){
    if(mealInfo.mealType === 'breakfast'){
      setbreakfastServings((currServings) => {
        return currServings + 1
      })
      setNewBreakfasts((currBreakfast) => {
        return [...currBreakfast,mealInfo]
      })
    }
    if(mealInfo.mealType === 'lunch'){
      setlunchServings((currServings) => {
        return currServings + 1
      })
      setNewLunch((currLunch) => {
        return [...currLunch,mealInfo]
      })
    }
    if(mealInfo.mealType === 'dinner'){
      setdinnerServings((currServings) => {
        return currServings + 1
      })
      setNewDinners((currDinner) => {
        return [...currDinner,mealInfo]
      })
    }
    if(mealInfo.mealType === 'dessert'){
      setdessertServings((currServings) => {
        return currServings + 1
      })
      setNewSnacks((currSnacks) => {
        return [...currSnacks,mealInfo]
      })
    }
    if(mealInfo.mealType === 'snacks'){
      setsnacksServings((currServings) => {
        return currServings + 1
      })
      setNewDesserts((currDessert) => {
        return [...currDessert,mealInfo]
      })
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
                  handleClick({ mealType: "snacks", date });
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
            <br />
            <button onClick={onSubmit} className="btn ml-6 btn-outline">
              Generate
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.638 1.093a.75.75 0 0 1 .724 0l2 1.104a.75.75 0 1 1-.724 1.313L10 2.607l-1.638.903a.75.75 0 1 1-.724-1.313l2-1.104ZM5.403 4.287a.75.75 0 0 1-.295 1.019l-.805.444.805.444a.75.75 0 0 1-.724 1.314L3.5 7.02v.73a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .388-.657l1.996-1.1a.75.75 0 0 1 1.019.294Zm9.194 0a.75.75 0 0 1 1.02-.295l1.995 1.101A.75.75 0 0 1 18 5.75v2a.75.75 0 0 1-1.5 0v-.73l-.884.488a.75.75 0 1 1-.724-1.314l.806-.444-.806-.444a.75.75 0 0 1-.295-1.02ZM7.343 8.284a.75.75 0 0 1 1.02-.294L10 8.893l1.638-.903a.75.75 0 1 1 .724 1.313l-1.612.89v1.557a.75.75 0 0 1-1.5 0v-1.557l-1.612-.89a.75.75 0 0 1-.295-1.019ZM2.75 11.5a.75.75 0 0 1 .75.75v1.557l1.608.887a.75.75 0 0 1-.724 1.314l-1.996-1.101A.75.75 0 0 1 2 14.25v-2a.75.75 0 0 1 .75-.75Zm14.5 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.388.657l-1.996 1.1a.75.75 0 1 1-.724-1.313l1.608-.887V12.25a.75.75 0 0 1 .75-.75Zm-7.25 4a.75.75 0 0 1 .75.75v.73l.888-.49a.75.75 0 0 1 .724 1.313l-2 1.104a.75.75 0 0 1-.724 0l-2-1.104a.75.75 0 1 1 .724-1.313l.888.49v-.73a.75.75 0 0 1 .75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      );
  }
}

