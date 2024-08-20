import recipeData from "../../db/data/test/recipeTestData"

export default function Recipes(){

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 m-8"> 
          {recipeData.map((recipe) => {
            return (
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={recipe.title}>
                  <a href="#">
                      <img className="rounded-t-lg" src={recipe.photo_url} alt="" />
                  </a>
                  <div className="p-5">
                      <a href="#">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`Cooking Time: ${recipe.preparation_time_minutes} minutes`}</p>
                  </div>
              </div>
            )
          })}
        </div>
      );
}