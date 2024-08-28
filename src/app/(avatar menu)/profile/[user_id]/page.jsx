import Image from "next/image";
import Link from "next/link";

export default async function Profile({ params }) {
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;

  const res = await fetch(
    `http://${host}:${port}/api/users/${params.user_id}`,
    {
      cache: "no-store",
    }
  );

  const responseData = await res.json();
  const user = responseData.user;

  const myRecipesData = await Promise.all(
    user.my_recipes.map(async (recipe_id) => {
      const resRecipe = await fetch(
        `http://${host}:${port}/api/recipes/${recipe_id}`
      );
      return await resRecipe.json();
    })
  );

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="card bg-white max-w-3xl shadow-xl p-4 flex flex-col items-center m-2">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            Hi {user.name}!
          </h2>
          <figure className="px-10 pt-10">
            <img
              alt="avatar image"
              className="w-48 h-48 mb-4 rounded-full shadow-lg"
              src={user.avatar_url}
            />
          </figure>
          <div className="card-body items-center text-center text-lg font-medium text-gray-900 dark:text-white mb-4">
            <p>Username: {user.username}</p>
          </div>
        </div>

        <div className="card bg-primary max-w-3xl shadow-xl p-4 m-4 flex flex-col items-center">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            My Posted Recipes
          </h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {myRecipesData.map((recipeObj) => (
              <Link
                href={`/recipes/${recipeObj.recipe.recipe_id}`}
                key={recipeObj.recipe.recipe_id}
              >
                <div className="card bg-base-100 shadow-xl flex flex-col items-center p-4">
                  <figure>
                    <img
                      src={recipeObj.recipe.photo_url}
                      alt={`Image of ${recipeObj.recipe.recipe_id}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </figure>
                  <div className="card-body text-center">
                    <h2 className="card-title">{recipeObj.recipe.title}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
