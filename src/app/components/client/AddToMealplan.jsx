'use client'
'use client'
import { useContext, useEffect, useState } from "react";
import { getMealPlan } from "api";
import { UserContext } from "@components/client/userProvider";
import { getDates } from "src/utils/getDates";
import Day from "@components/client/Day";
import Loading from "@components/client/Loading";

export default function AddToMealPlan({recipe,setClicked}){

    const [diff, setDiff] = useState(0)
    const [servingsToAllocate,setServingsToAllocate] = useState(recipe.serves)
    const {user} = useContext(UserContext)
    const [mealPlan,setmealPlan] = useState({})
    const [hasMealPlan, setHasMealPlan] = useState(false)
    const [dates, setDates] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [today, setToday] = useState("")
    const [recipeToAdd,setRecipeToAdd] = useState(recipe)
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

    function handleClick(){
        setDiff((currDiff) => {
            if(currDiff === 0){
                return 1
            } else{
                return 0
            }
        })
    }

    function handleClose(){
        setClicked((currClicked) => {
            return !currClicked
        })
    }

    if(hasMealPlan){

            return (
                <div className="mealplan-popup" >
                    <div className="justify-center card bg-primary text-primary-content w-96">
                        <div className="card-body">
                            <h2 className="card-title">Meal Plan<button onClick={handleClick} className="btn btn-outline" style={{marginLeft: "6rem"}} >{diff === 0 ? 'next week' : 'this week'}</button><button className="btn btn-outline" onClick={handleClose} style={{marginLeft: "2rem"}} >X</button></h2>
                            <h2 style={{marginTop: "1rem"}} className="card-title">{`New Meal: ${recipe.title}`}</h2>
                            <h2 className="card-title"><b>{`Select ${servingsToAllocate} slots`}</b></h2>
                            <div className="card-actions justify-end">
                            <section className="week-container">
                    {days.map((day, index) => {
                        return (
                        <div key={`${dates[index]}-container`}>
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
                            />
                        </div>
                        );
                    })}
                    </section>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}