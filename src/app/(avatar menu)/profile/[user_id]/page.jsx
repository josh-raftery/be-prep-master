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
  console.log(res,'sucessfull ingredents ')

  const responseData = await res.json();
  const user = responseData.user;

  return (
    <>
      <div className="flex flex-col items-center pb-10 m-4">
        <container className="card bg-white max-w-3xl shadow-xl flex-col items-center p-4">
          <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white m-2 flex flex-col items-center ">
              Hi {user.name}!
          </h2>
          <figure className="px-10 pt-10">
            <img
              alt="avatar image"
              className="w-48 h-48 mb-3 rounded-full shadow-lg"
              src={user.avatar_url}
            />
          </figure>
          <div className="card-body items-center text-center">
            
            <p>Username: {user.username}</p>
          </div>
          
          <section id="scores-section">
            <h3 className="text-xl font-semibold">Scores:</h3>
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
              <section id="hearts-section" className="m-2">
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
            </section>
            <section> 
              <div className="card-actions justify-center">
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
              <div className="card-actions justify-center">
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
            </section>
        </container>  
      </div>







    </>
  );
}
