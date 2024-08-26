'use client'
import { useContext, useEffect, useState } from "react";
import { getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Loading from "@components/client/Loading";
import MealGeneratorDays from "@components/client/MealGeneratorDays";

export  default function MealPlanGenerator(){
    const {user} = useContext(UserContext)
    const [mealPlan,setmealPlan] = useState([])
    const [hasMealPlan, setHasMealPlan] = useState(false)
    const [dates, setDates] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [diff, setDiff] = useState(0) // diff 1 = next week dates, diff -1 = previous week dates, 0 this week
    const [today, setToday] = useState("")
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    useEffect(() => {
        getMealPlan(user.user_id)
        .then((mealplanData) => {
            setmealPlan(mealplanData)
            setHasMealPlan(true)
        })
        setDates(getDates(diff))
        setIsLoading(false)
        const date = new Date()
        
        if(date.getDay() === 0){
            setToday("Sunday")
        }else{
            setToday(days[date.getDay() - 1])
        }
    },[diff])

    function handleClick(){
        setDiff((currDiff) => {
            if(currDiff === 0){
                return 1
            } else{
                return 0
            }
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(mealPlan.meals && !isLoading){
        return (
            <div className="mealplan-popup" >
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">Meal Plan<button onClick={handleClick} className="btn btn-outline" style={{marginLeft: "7rem"}} >{diff === 0 ? 'next week' : 'this week'}</button></h2>
                    <div className="card-actions justify-end">
                    {days.map((day,index) => {
                        return(
                            <div key = {`${dates[index]}-container`} >
                                <MealGeneratorDays key={dates[index]} today={today} day={day} date={dates[index]} mealPlan={mealPlan}/>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
                
        )
    }
}

