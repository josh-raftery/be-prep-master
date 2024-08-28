"use client";
import { useContext, useEffect, useState } from "react";
import { getMealPlan } from "api";
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
  function handleChange(e) {
    setNewMeal(e.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (newMeal.trim() === "") return;
    const updatedMealPlan = [...mealPlan, { day: today, meal: newMeal }];
    setMealPlan(updatedMealPlan);
    setNewMeal("");
  }
  if (isLoading) {
    return <Loading />;
  }

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
          <form onSubmit={handleFormSubmit}>
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
          </form>
          {/* Display the meal plan  */}
          <div className="card-actions justify-end">
            {days.map((day, index) => (
              <div key={`${dates[index]}-container`}>
                <MealGeneratorDays
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
