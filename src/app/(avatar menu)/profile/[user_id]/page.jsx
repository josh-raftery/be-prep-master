
export default async function Profile({ params }) {
  const res = await fetch(`http://localhost:3000/api/users/${params.user_id}`, {
    cache: "no-store",
  })

  const responseData = await res.json();
  const user = responseData.user;

  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-10">
        <div className="flex flex-col items-center pb-10 m-4">
          <img
            alt="avatar image"
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={user.avatar_url}
          />
          <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white m-2">
            {user.name}
          </h2>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 m-2">
            {user.username}
          </h3>
          <h3 className="text-sm text-gray-900 dark:text-gray-400 m-2">
            Score
          </h3>
          <section id="stars">
            <div className="flex items-center m-4">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-yellow-300 me-1"
                fill="currentColor"
                viewBox="0 0 22 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-yellow-300 me-1"
                fill="currentColor"
                viewBox="0 0 22 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-yellow-300 me-1"
                fill="currentColor"
                viewBox="0 0 22 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-yellow-300 me-1"
                fill="currentColor"
                viewBox="0 0 22 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 22 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                4.95
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                out of
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                5
              </p>
            </div>
          </section>
          <button class="flex mt-4 md:mt-6">
            <a
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit my profile
            </a>
          </button>
        </div>
      </div>
    </>
  );
}