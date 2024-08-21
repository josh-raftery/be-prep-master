import React from "react";
import recipeData from "../../../../db/data/test/recipeTestData";

//axios request to get recipebyId

const SingleRecipe = () => {
 
  return (
  <div>
    <img className="h-[500px] " src={recipeData[1].photo_url} alt={recipeData[1].title}/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipeData[1].title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{recipeData[1].description}</p>
   
    </div>
    <section>
    <div id="accordion-collapse" data-accordion="collapse">
  <div id="accordion-collapse-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>Nutrition</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </div>
  <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        Per portion (in grams)
        <ul className="list-disc">
        <li>Kcal: {recipeData[1].kcal}</li>
        <li>Protein: {recipeData[1].protein}</li>
        <li>Fat: {recipeData[1].fat}</li>
        <li>Carbohydrate: {recipeData[1].carbohydrate}</li>
        <li>Sugar: {recipeData[1].sugar}</li>
        <li>Salt: {recipeData[1].salt}</li>
        <li>Fibre: {recipeData[1].fibre}</li>
        </ul>
      </p>
    
    </div>
  </div>
  <div id="accordion-collapse-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
      <span>Ingredients</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </div>
  <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
    <ul className="list-disc">
        {recipeData[1].ingredients.map((ingredient)=>{
          return(
            <li>{ingredient}</li>
          )
        })}</ul>
    </div>
  </div>
  <div id="accordion-collapse-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
      <span>Method</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </div>
  <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
    <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
    <ol className="list-decimal">
      {recipeData[1].instructions.map((step)=>{
        return(
          <li>{step}</li>
        )
      })}</ol>
    </div>
  </div>
</div>
</section>
  </div>
  
);
};

export default SingleRecipe;
