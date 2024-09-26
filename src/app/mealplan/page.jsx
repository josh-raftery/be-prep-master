"use client";
import { useContext, useEffect, useState } from "react";
import { deleteMeal, getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Day from "@components/client/Day";
import Loading from "@components/client/Loading";
import ToCook from "@components/client/ToCook";
import Next from "@components/client/Next";
import Previous from "@components/Previous";
import { useRouter } from "next/navigation";


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
  const [hasCheckedUser,sethasCheckedUser] = useState(false)
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const router = useRouter()

  useEffect(() =>{
    if(user === null){
      router.push('/redirect')
    }else{
      sethasCheckedUser(true)
    }
  },[])

  useEffect(() => {
    if(hasCheckedUser){
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
    }
  }, [diff,hasCheckedUser]);

  function changeWeek(inc){
    setDiff(inc)
  }

  function thisWeek(){
    setDiff(0)
  }

  function clearPlan(){
    const meal_ids = mealPlan.meals.map((meal) => {
      let meal_id = meal.meal_id
      return { meal_id }
    })
    deleteMeal(user.user_id, meal_ids)
    .then(() => {
      setmealPlan((currMealPlan) => {
        let newMealPlan = currMealPlan
        newMealPlan.meals = []
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
      <section className="mealplan">
        <div className="mealplan-container w-full">
          <h2 className="card-title">My MealPlan</h2>
          <div className="date-buttons flex w-full gap-x-4">
            <button
              onClick={() => changeWeek(-1)}
              className={`${diff < 0 ? "border-2 border-green-500" : ""} btn btn-accent flex-grow`}
            >
              <Previous /> Last Week
            </button>
            <button
              onClick={thisWeek}
              className={`${diff === 0 ? "border-2 border-green-500" : ""} btn btn-accent flex-grow`}
            >
              This Week
            </button>
            <button
              onClick={() => changeWeek(1)}
              className={`${diff > 0 ? "border-2 border-green-500" : ""} btn btn-accent flex-grow`}
            >
              Next Week <Next />
            </button>
          </div>
          <div className="clear-button mt-2">
            <button onClick={clearPlan} className="btn btn-error w-full">
              Clear Meal Plan
            </button>
          </div>
          <section style={{marginTop: "1rem"}} className="week-container">
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
        </div>
      </section>
    );
  }
}
