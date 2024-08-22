'use client'
import { useContext, useEffect, useState } from "react";
import { getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";

export  default function MealPlan({params}){
    const {user} = useContext(UserContext)
    const [mealPlan,setmealPlan] = useState({})
    const [hasMealPlan, setHasMealPlan] = useState(false)

    console.log(user)

    useEffect(() => {
        getMealPlan(user.user_id)
        .then((mealplanData) => {
            console.log(mealplanData, ' <------------------')
            setmealPlan(mealplanData)
            setHasMealPlan(true)
        })
    },[])

    if(hasMealPlan){
        return (
            <h1>meals...</h1>
        )
    } else {
        return (
            <h1>create mealPlan</h1>
        )
    }
}

