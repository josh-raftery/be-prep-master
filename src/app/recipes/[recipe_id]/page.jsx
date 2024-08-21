import React from "react";
import recipeData from "../../../../db/data/test/recipeTestData";
import RootLayout from "src/app/layout";

//axios request to get recipebyId

export default async function SingleRecipe({params}) {
  const res = await fetch(`http://localhost:3000/api/recipes/${params.recipe_id}`, {
    cache: 'no-store',
  });
  const responseData = await res.json()
  const recipe = responseData.recipe;
 
  return (
    <RootLayout>
  <div>
    <img className="h-[500px] " src={recipe.photo_url} alt={recipe.title}/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{recipe.description}</p>
    </div>
    <section>
    <div id="accordion-collapse" data-accordion="collapse">
  <div id="accordion-collapse-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>Nutrition</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </div>
  <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-2 text-gray-500 dark:text-gray-400">
        Per portion (in grams)
        <ul className="list-disc">
        <li>Kcal: {recipe.kcal}</li>
        <li>Protein: {recipe.protein}</li>
        <li>Fat: {recipe.fat}</li>
        <li>Carbohydrate: {recipe.carbohydrate}</li>
        <li>Sugar: {recipe.sugar}</li>
        <li>Salt: {recipe.salt}</li>
        <li>Fibre: {recipe.fibre}</li>
        </ul>
      </div>
    </div>
  </div>
  <div id="accordion-collapse-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
      <span>Ingredients</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor"L="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </div>
  <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
    <ul className="list-disc">
        {recipe.ingredients.map((ingredient)=>{
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
        <path stroke="currentColor"L="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </div>
  <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
    <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
    <ol className="list-decimal">
      {recipe.instructions.map((step)=>{
        return(
          <li>{step}</li>
        )
      })}</ol>
    </div>
  </div>
</div>
</section>
  </div>
  </RootLayout>
);
};


