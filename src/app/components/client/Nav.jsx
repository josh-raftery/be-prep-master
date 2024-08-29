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
        <div className="flex items-center justify-between bg-white border-b border-gray-200 dark:bg-gray-900 py-2">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
            <div
              onClick={routeHome}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/logo.png"
                className="h-20 w-20"
                alt="PrepMaster logo"
              />
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="relative">
                <button
                  className="btn m-1 btn-primary"
                  onClick={() => toggleDropdown("recipes")}
                >
                  Recipes
                </button>
                {activeDropdown === "recipes" && (
                  <ul className="absolute top-full left-0 mt-2 bg-base-100 rounded-box z-[1] w-32 p-2 shadow-lg">
                    <Link href="/recipes">
                      <button
                        className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        All Recipes
                      </button>
                    </Link>
                    <div className="divider my-2"></div>
                    <Link href="/recipes/post-recipe">
                      <button
                        className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Post a Recipe
                      </button>
                    </Link>
                  </ul>
                )}
              </div>
              <div className="relative">
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDropdown("mealplan")}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Meal Plan
                </button>
                {activeDropdown === "mealplan" && (
                  <ul className="absolute top-full left-0 mt-2 bg-base-100 rounded-box z-[1] w-32 p-2 shadow-lg">
                    <Link href="/mealplan">
                      <button
                        className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        My Meal Plan
                      </button>
                    </Link>
                   
                    <div className="divider my-2"></div>
                    <Link href="/mealPlanGenerator">
                      <button
                        className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Generate Plan
                      </button>
                    </Link>
                    <div className="divider my-2"></div>
                    <Link href="/achievements">
                      <button
                        className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                      >
                        Progress
                      </button>
                    </Link>
                    <div className="divider my-2"></div>
                    <Link href={`/shopping-list`}>
                      <button
                        className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Shopping List
                      </button>
                    </Link>
                  </ul>
                )}
              </div>
              <div className="relative">
                <button
                  className="btn btn-accent"
                  onClick={() => toggleDropdown("profile")}
                >
                  Profile
                </button>
                {activeDropdown === "profile" && (
                  <ul className="absolute top-full left-0 mt-2 bg-base-100 rounded-box z-[1] w-32 p-2 shadow-lg">
                    {user.user_id && (
                      <>
                        <Link href={`/profile/${user.user_id}`}>
                          <button
                            className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                            onClick={closeDropdown}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            My Profile
                          </button>
                        </Link>
                        <div className="divider my-2"></div>
                      </>
                    )}
                    <Link href={user.username ? "/signout" : "/signin"}>
                      <button
                        className="btn btn-ghost text-center w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {user.username ? "Sign Out" : "Sign In"}
                      </button>
                    </Link>
                    <div className="divider my-2"></div>
                    <Link href="/signup">
                      <button
                        className="btn btn-ghost text-left w-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                        onClick={closeDropdown}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Sign Up
                      </button>
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