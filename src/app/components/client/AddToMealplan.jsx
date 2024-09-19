"use client";
"use client";
import { useContext, useEffect, useState } from "react";
import { addMeal, getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Day from "@components/client/Day";
import Loading from "@components/client/Loading";
import Next from "./Next";
import Previous from "@components/Previous";

export default function AddToMealPlan({ recipe, setClicked }) {
  const [diff, setDiff] = useState(0);
  const [servingsToAllocate, setServingsToAllocate] = useState(recipe.serves);
  const { user } = useContext(UserContext);
  const [mealPlan, setmealPlan] = useState({});
  const [hasMealPlan, setHasMealPlan] = useState(false);
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [today, setToday] = useState("");
  const [recipeToAdd, setRecipeToAdd] = useState(recipe);
  const [cleared,setCleared] = useState(false)
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [newMeals, setNewMeals] = useState([]);

  useEffect(() => {
    getMealPlan(user.user_id).then((mealplanData) => {
      setmealPlan(mealplanData);
      setHasMealPlan(true);
    });
    setDates(getDates(diff));
    setIsLoading(false);
    const date = new Date();

    if (date.getDay() === 0) {
      setToday("Sunday");
    } else {
      setToday(days[date.getDay() - 1]);
    }
  }, [diff]);

  if (isLoading) {
    return <Loading />;
  }

  function handleSubmit() {
    addMeal(user.user_id, newMeals)
    .then(() => {
      setClicked((currClicked) => {
        return !currClicked;
      });
    });
  }

  function handleClick() {
    setDiff((currDiff) => {
      if (currDiff === 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  function handleClose() {
    setClicked((currClicked) => {
      return !currClicked;
    });
  }

  if (hasMealPlan) {
    return (
      <div className="mealplan-popup">
        <div className="card text-primary-content w-auto shadow-lg">
          <div className="card-body">
            <h2 className="add-mealplan-header card-title">Meal Plan

            </h2>
              <button
                className="close-popup btn btn-ghost"
                onClick={handleClose}
                style={{ marginLeft: "2rem" }}
              >
                <img style={{width: "25px"}} src="/close.png" />
              </button>
              <button
                onClick={handleClick}
                className="btn btn-secondary"
                style={{ marginLeft: "2rem" }}
              >
                {diff > 0 && <Previous/>}
                {diff === 0 ? "next week" : "this week"}
                {diff === 0 && <Next/>}
              </button>
            <h2
              style={{ marginTop: "1rem" }}
              className="add-mealplan-header card-title"
            >{`New Meal: ${recipe.title}`}</h2>
            <h2 className="add-mealplan-header card-title">
              <b>{`Select ${servingsToAllocate} slots`}</b>
            </h2>
            <button onClick={handleSubmit} style={{marginRight: "1.5rem"}} className="btn ml-6 btn-accent">Submit</button>
            <div className="card-actions justify-end">
              <section className="week-container">
                <div className="grid gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-auto">
                {days.map((day, index) => {
                  return (
                      <Day
                        setClicked={setClicked}
                        user_id={user.user_id}
                        key={dates[index]}
                        today={today}
                        day={day}
                        date={dates[index]}
                        mealPlan={mealPlan}
                        popUp={true}
                        servingsToAllocate={servingsToAllocate}
                        setServingsToAllocate={setServingsToAllocate}
                        recipeToAdd={recipeToAdd}
                        newMeals={newMeals}
                        setNewMeals={setNewMeals}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
