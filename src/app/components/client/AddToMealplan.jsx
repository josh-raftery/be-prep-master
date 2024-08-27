'use client'
import { useState} from "react"
import MealPlan from "src/app/mealplan/page";

export default function AddToMealPlan({recipe}){

    const [diff, setDiff] = useState(0)
    const [servingsToAllocate,setServingsToAllocate] = useState(recipe.serves)

    function handleClick(){
        setDiff((currDiff) => {
            if(currDiff === 0){
                return 1
            } else{
                return 0
            }
        })
    }

    return (
        <div className="mealplan-popup" >
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">Meal Plan<button onClick={handleClick} className="btn btn-outline" style={{marginLeft: "7rem"}} >{diff === 0 ? 'next week' : 'this week'}</button></h2>
                    <h2 style={{marginTop: "1rem"}} className="card-title">{`New Meal: ${recipe.title}`}</h2>
                    <h2 className="card-title"><b>{`Select ${servingsToAllocate} slots`}</b></h2>
                    <div className="card-actions justify-end">
                        <MealPlan diff={diff} popUp={true} servingsToAllocate={servingsToAllocate} setServingsToAllocate={setServingsToAllocate} recipeToAdd={recipe}/>
                    </div>
                </div>
            </div>
        </div>
)
}