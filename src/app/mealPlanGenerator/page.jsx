"use client";
import { useContext, useEffect, useState } from "react";
import { addMeal, getMealPlan,getRandomRecipe } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Loading from "@components/client/Loading";
import MealGeneratorDays from "@components/client/MealGeneratorDays";

export default function MealPlanGenerator() {
  const { user } = useContext(UserContext);
  const [mealPlan, setMealPlan] = useState([]);
  const [hasMealPlan, setHasMealPlan] = useState(false);
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [diff, setDiff] = useState(0); // diff 1 = next week dates, diff -1 = previous week dates, 0 this week
  const [today, setToday] = useState("");
  const [newMeal, setNewMeal] = useState("");
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
  const [hasAdded, sethasAdded] = useState(false)
  const [recipeAdded,setRecipeAdded] = useState(false)
  
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    setIsLoading(true);
    getMealPlan(user.user_id)
      .then((mealPlanData) => {
        setMealPlan(mealPlanData);
        setHasMealPlan(true);
      })
      .catch((err) => {
        console.log("Failed to fetch meal plan", err);
        setHasMealPlan(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setDates(getDates(diff));
    const date = new Date();

    if (date.getDay() === 0) {
      setToday("Sunday");
    } else {
      setToday(days[date.getDay() - 1]);
    }
  }, [diff, user.user_id]);

  function handleClick() {
    setDiff((currDiff) => {
      if (currDiff === 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  function onSubmit() {
    const newBreakfastsCopy = [...newBreakfasts];
    const newLunchCopy = [...newLunch];
    const newDinnersCopy = [...newDinners];
    const newSnacksCopy = [...newSnacks];
    const newDessertsCopy = [...newDesserts];
  
    const queries = [];
  
    if (breakfastServings) {
      queries.push(getRandomRecipe({ mealType: 'breakfast', serves: breakfastServings }));
    }
  
    if (lunchServings) {
      queries.push(getRandomRecipe({ mealType: 'lunch', serves: lunchServings }));
    }
  
    if (dinnerServings) {
      queries.push(getRandomRecipe({ mealType: 'dinner', serves: dinnerServings }));
    }
  
    if (snacksServings) {
      queries.push(getRandomRecipe({ mealType: 'snack', serves: snacksServings }));
    }
  
    if (dessertServings) {
      queries.push(getRandomRecipe({ mealType: 'dessert', serves: dessertServings }));
    }
  
    Promise.all(queries).then((recipesArray) => {
      recipesArray.forEach((recipe) => {
        for (let i = 0; i < recipe.serves; i++) {
          if (recipe.mealType === 'breakfast') {
            newBreakfastsCopy[i].recipe_id = recipe.recipe_id;
          }
          if (recipe.mealType === 'lunch') {
            newLunchCopy[i].recipe_id = recipe.recipe_id;
          }
          if (recipe.mealType === 'dinner') {
            newDinnersCopy[i].recipe_id = recipe.recipe_id;
          }
          if (recipe.mealType === 'snack') {
            newSnacksCopy[i].recipe_id = recipe.recipe_id;
          }
          if (recipe.mealType === 'dessert') {
            newDessertsCopy[i].recipe_id = recipe.recipe_id;
          }
        }
      });
  
      const allMeals = [
        ...newBreakfastsCopy,
        ...newLunchCopy,
        ...newDinnersCopy,
        ...newSnacksCopy,
        ...newDessertsCopy,
      ];
  
      console.log(allMeals, ' all Meals');
  
      addMeal(user.user_id, allMeals)
      .then((response) => {
        setMealPlan((currMealPlan) => {
          return {
            ...currMealPlan,
            meals: [...currMealPlan.meals, ...response],
          }
        })
        setsnacksServings(0)
        setdessertServings(0)
        setbreakfastServings(0)
        setdinnerServings(0)
        setlunchServings(0)
      });
    });
  }
  

  // function handleChange(e) {
  //   setNewMeal(e.target.value);
  // }

  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   if (newMeal.trim() === "") return;
  //   const updatedMealPlan = [...mealPlan, { day: today, meal: newMeal }];
  //   setMealPlan(updatedMealPlan);
  //   setNewMeal("");
  // }
  // if (isLoading) {
  //   return <Loading />;
  // }

  if(hasMealPlan){
    return (
      <div className="mealplan-popup">
        <div className="card bg-primary text-primary-content w-full shadow-lg ">
          <div className="card-body">
            <h2 className="card-title">
              Meal Plan
              <button
                onClick={handleClick}
                className="btn btn-outline"
                style={{ marginLeft: "7rem" }}
              >
                {diff === 0 ? "Next Week" : "This Week"}
              </button>
            </h2>
            {/* Form to add new meal
            */}
            {/* <form onSubmit={handleFormSubmit}>
              <div className="form-control">
                <label htmlFor="mealInput" className="label">
                  <span className="label-text text-lg">Add a meal for {today}</span>
                </label>
                <input
                  type="text"
                  id="mealInput"
                  value={newMeal}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Enter meal name"
                />
              </div>
              <button type="submit" className="btn mt-4">
                Add Meal
              </button>
            </form> */}
            {/* Display the meal plan  */}
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
            <div className="card-actions justify-end">
              {days.map((day, index) => (
                <div key={`${dates[index]}-container`}>
                  <MealGeneratorDays
                    setbreakfastServings={setbreakfastServings}
                    setNewBreakfasts={setNewBreakfasts}
                    setlunchServings={setlunchServings}
                    setNewLunch={setNewLunch}
                    setdinnerServings={setdinnerServings}
                    setNewDinners={setNewDinners}
                    setdessertServings={setdessertServings}
                    setNewDesserts={setNewDesserts}
                    setsnacksServings={setsnacksServings}
                    setNewSnacks={setNewSnacks}
                    key={dates[index]}
                    today={today}
                    day={day}
                    date={dates[index]}
                    mealPlan={mealPlan}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
