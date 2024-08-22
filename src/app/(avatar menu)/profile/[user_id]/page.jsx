import Image from "next/image";


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

  return (
    <>
      <container className="flex flex-col items-center pb-10 m-4">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-10">
          <div className="flex flex-col items-center pb-10 m-4">
            <img
              alt="avatar image"
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={user.avatar_url}
            />
            <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white m-2">
              Hi {user.name}!
            </h2>
            <h3 className="text-md text-gray-500 dark:text-gray-400 m-2">
              Username: {user.username}
            </h3>

            <container id="scores-section">
              <h3 className="text-md text-gray-900  m-2">Scores</h3>
              <section className="rating rating-md m-2" id="stars-section">
                <input
                  type="radio"
                  name="rating-8"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-8"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-8"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-8"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-8"
                  className="mask mask-star-2 bg-orange-400"
                />
              </section>
              <section id ="hearts-section" className ="m-2">
                <div className="rating gap-1">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-red-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-green-400"
                  />
                </div>
              </section>
            </container>
            <div className="card-actions justify-end">
              {/* insert link or navigation to edit profile page */}
              <button className="btn bg-primary mt-4">
                <Image
                src="/editUserIcon.png"
                alt="edit profile icon"
                width={20}
                height={20}
                />
                     Edit my profile
              </button>
            </div>
            <div className="card-actions justify-end">
              {/* insert link or navigation to favouriteRecipes */}
              <button className="btn bg-secondary mt-4">
                <Image
                src="/heartIcon.png"
                alt="heart icon"
                width={20}
                height={20}
                />
                     My Favourite Recipes
              </button>
            </div>
          </div>
        </div>
      </container>
    </>
  );
}
