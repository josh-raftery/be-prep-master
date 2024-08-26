'use client'
import { useContext, useEffect, useState } from "react";
import { getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Day from "@components/client/Day";
import Loading from "@components/client/Loading";

export  default function MealPlan({popUp, diff=0, setServingsToAllocate, servingsToAllocate,recipeToAdd}){
    const {user} = useContext(UserContext)
    const [mealPlan,setmealPlan] = useState({})
    const [hasMealPlan, setHasMealPlan] = useState(false)
    const [dates, setDates] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [diff, setDiff] = useState(0) // diff 1 = next week dates, diff -1 = previous week dates, 0 this week
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

    if(isLoading){
        return <Loading/>
    }

    if(mealPlan.meals && !isLoading){
        return (
            <section className="week-container" >
                {days.map((day,index) => {
                    return(
                        <div key = {`${dates[index]}-container`} >
                            <Day key={dates[index]} today={today} day={day} date={dates[index]} mealPlan={mealPlan} popUp={popUp} servingsToAllocate={servingsToAllocate} setServingsToAllocate={setServingsToAllocate} recipeToAdd={recipeToAdd}/>
                        </div>
                    )
                })}
            </section>
        )
    }
}

