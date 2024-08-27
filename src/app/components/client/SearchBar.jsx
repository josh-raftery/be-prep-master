'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

  const SearchBar = () => {
  const [searchInput, setSearchInput] = React.useState("")
  const [search, setSearch] = useState("")
  const router = useRouter()

  function handleChange(event){
    setSearchInput(event.target.value)
  }

  async function handleSubmit(event){
    event.preventDefault() // could be the problem 
    setSearch(searchInput)
    router.push(`/search/${searchInput}`)
    setSearchInput("")
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{marginBottom: "1rem", marginTop: "1rem"}} className="max-w-sm mx-auto ">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search recipes..."
            required
            onChange={handleChange}
            value={searchInput}
          />
          {/* Would look to extract this into the client side when the on submit handler would be made */}
          <button
            type="submit"
            className="text-black absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchBar
