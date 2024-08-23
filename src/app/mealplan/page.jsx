'use client'
import { useContext, useEffect, useState } from "react";
import { getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Day from "@components/client/Day";
import Loading from "@components/client/Loading";

export  default function MealPlan(){
    const {user} = useContext(UserContext)
    const [mealPlan,setmealPlan] = useState({})
    const [hasMealPlan, setHasMealPlan] = useState(false)
    const [dates, setDates] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [diff, setDiff] = useState(0) // diff 1 = next week dates, diff -1 = previous week dates
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    useEffect(() => {
        getMealPlan(user.user_id)
        .then((mealplanData) => {
            console.log(mealplanData, ' <-----')
            setmealPlan(mealplanData)
            setHasMealPlan(true)
        })
        setDates(getDates(diff))
        setIsLoading(false)
    },[])

    if(isLoading){
        return <Loading/>
    }

    if(mealPlan.meals && !isLoading){
        return (
            <section className="week-container" >
                {days.map((day,index) => {
                    return(
                        <div key = {`${dates[index]}-container`} >
                            <Day key={dates[index]} day={day} date={dates[index]} mealPlan={mealPlan} />
                        </div>
                    )
                })}
            </section>
        )
    }
}

