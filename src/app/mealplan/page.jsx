"use client";
import { useContext, useEffect, useState } from "react";
import { deleteMeal, getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Day from "@components/client/Day";
import Loading from "@components/client/Loading";
import ToCook from "@components/client/ToCook";


export default function MealPlan({
  popUp,
  setServingsToAllocate,
  servingsToAllocate,
  recipeToAdd,
}) {
  const { user } = useContext(UserContext);
  const [mealPlan, setmealPlan] = useState({});
  const [hasMealPlan, setHasMealPlan] = useState(false);
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [diff, setDiff] = useState(0) // diff 1 = next week dates, diff -1 = previous week dates, 0 this week
  const [today, setToday] = useState("");
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

  function changeWeek(inc){
    setDiff((currDiff) => {
      return currDiff + inc
    })
  }

  function thisWeek(){
    setDiff(0)
  }

  function clearPlan(){
    console.log(mealPlan.meals, ' meals')
    const meal_ids = mealPlan.meals.map((meal) => {
      let meal_id = meal.meal_id
      return { meal_id }
    })
    deleteMeal(user.user_id, meal_ids)
    .then(() => {
      console.log(mealPlan, ' meal plan')
      setmealPlan((currMealPlan) => {
        let newMealPlan = currMealPlan
        newMealPlan.meals = []
        console.log(newMealPlan, ' newMealPlan')
        return newMealPlan
      })
      setCleared(true)
    })
  }

  if (isLoading) {
    return <Loading />;
  }

  if (mealPlan.meals && !isLoading) {
    return (
      <>
        <div className="date-buttons" >
          <button style={{marginRight: "1rem"}} onClick={() => changeWeek(-1)} className={diff < 0 ? "btn btn-outline btn-success" : "btn btn-outline"}>Last Week</button>
          <button onClick={thisWeek} className={diff === 0 ? "btn btn-outline btn-success" : "btn btn-outline"}>This Week</button>
          <button style={{marginLeft: "1rem"}} onClick={() => changeWeek(1)} className={diff > 0 ? "btn btn-outline btn-success" : "btn btn-outline"}>Next Week</button>
        </div>
        <div style={{marginBottom: "0.5rem"}} className="clear-button" >
          <button  style={{ width: "340px" }} onClick={clearPlan} className="btn btn-wide btn-outline btn-error">Clear Meal Plan</button>
        </div>
        <section className="week-container">
          {days.map((day, index) => {
            return (
              <div key={`${dates[index]}-container`}>
                <Day
                  key={dates[index]}
                  today={today}
                  day={day}
                  date={dates[index]}
                  mealPlan={mealPlan}
                  popUp={popUp}
                  servingsToAllocate={servingsToAllocate}
                  setServingsToAllocate={setServingsToAllocate}
                  recipeToAdd={recipeToAdd}
                  diff={diff}
                  cleared={cleared}
                  setCleared={setCleared}
                />
              </div>
            );
          })}
        </section>
      </>
    );
  }
}
