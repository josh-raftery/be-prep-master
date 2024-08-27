"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { UserContext } from "@components/client/userProvider";


export default function Nav() {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is active
  const router = useRouter();
  const { user } = useContext(UserContext);

  function routeHome() {
    router.push("/");
  }

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <nav>
        <div className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <div onClick={routeHome} className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/logo.png" className="h-20 w-20" alt="PrepMaster logo" />
            </div>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="dropdown">
                <button className="btn m-1 btn-primary" onClick={() => toggleDropdown("recipes")}>Recipes</button>
                {activeDropdown === "recipes" && (
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-30 p-2 shadow">
                    <Link href="/recipes">
                      <li onClick={closeDropdown}>All Recipes</li>
                    </Link>
                    <Link href="/recipes/add">
                      <li onClick={closeDropdown}>Add Recipe</li>
                    </Link>
                  </ul>
                )}
              </div>
              <div className="dropdown">
                <button className="btn m-1 btn-secondary" onClick={() => toggleDropdown("mealplan")}>Meal Plan</button>
                {activeDropdown === "mealplan" && (
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-30 p-2 shadow">
                    <Link href="/mealplan">
                      <li onClick={closeDropdown}>My Meal Plan</li>
                    </Link>
                    <Link href={`/shopping-list/${user.user_id}`}>
                      <li onClick={closeDropdown}>Shopping List</li>
                    </Link>
                  </ul>
                )}
              </div>
              <div className="dropdown">
                <button className="btn m-1 btn-accent" onClick={() => toggleDropdown("profile")}>Profile</button>
                {activeDropdown === "profile" && (
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-30 p-2 shadow">
                    <Link href={`/profile/${user.user_id}`}>
                      <li onClick={closeDropdown}>My Profile</li>
                    </Link>
                    <Link href={user.username ? "/signout" : "/signin"}>
                      <li onClick={closeDropdown}>{user.username ? "Sign Out" : "Sign in"}</li>
                    </Link>
                    <Link href="/signup">
                      <li onClick={closeDropdown}>Sign Up</li>
                    </Link>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
