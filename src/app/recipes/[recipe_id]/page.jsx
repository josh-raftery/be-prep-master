"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import AddToMealPlan from "@components/client/AddToMealplan";
import { getRecipeById } from "api";
import Loading from "@components/client/Loading";
import { UserContext } from "@components/client/userProvider";
import Modal from "@components/client/Modal.jsx";
import Link from "next/link";
import {patchUserShoppingList} from "api";

export default function SingleRecipe({ params }) {
  const [recipe, setRecipe] = useState({});
  const [clicked, setClicked] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [buttonText, setButtonText] = useState("+ Shopping List");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [openModalSignInShopping, setOpenModalSignInShopping] = useState(false);
  const [openModalSignInMealplan, setOpenModalSignInMealplan]  = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getRecipeById(params.recipe_id)
      .then((recipe) => {
        setRecipe(recipe);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err, " err");
      });
  }, []);

  function handleClick() {
    if (!user || !user.user_id) {
      setOpenModalSignInMealplan(true);
      return;
    }else{
      setClicked((currClicked) => {
      return !currClicked;
    });}
    
  }

  const handleAddToShoppingList = async () => {
    if (!user || !user.user_id) {
      setOpenModalSignInShopping(true);
      return;
    }else{
    fetch(`https://be-prep-master.vercel.app/api/users/${user.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        const currentList = data.user.shopping_list;
        const newList = [...currentList, ...recipe.ingredients];
        patchUserShoppingList(user.user_id, newList)
        setButtonText("Shopping List Updated");
        setIsButtonDisabled(true);
      })
      .catch((err) => {
        console.error("Error updating shopping list:", err);
      })
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!recipe.recipe_id) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div>
      {clicked && <AddToMealPlan recipe={recipe} setClicked={setClicked} />}
      {/* Main flex container */}
      <div className="flex flex-col lg:flex-autocol gap-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section
          className="hero bg-base-200 flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-12 rounded-lg shadow-lg"
          id="hero-recipe"
        >
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={recipe.photo_url}
              alt={recipe.title}
              className="rounded-lg shadow-2xl w-full"
              width={500}
              height={400}
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 flex-grow">
            <h1 className="text-3xl lg:text-5xl font-bold">{recipe.title}</h1>
            <h2 className="text-xl lg:text-2xl mt-2">{recipe.chef}</h2>
            <p className="py-6">{recipe.description}</p>
          </div>
        </section>
        <div className="card-actions justify-center">
          <button onClick={handleClick} className="btn bg-secondary mt-4">
            + Meal Plan
          </button>
        </div>

        {/* Stats Bar Section */}
        <section
          id="stats-bar"
          className="recipe-stats flex flex-col sm:flex-row gap-2 sm:gap-2 m-4"
        >
          <div className="stat bg-primary flex-1 rounded-lg shadow-lg">
            <div className="stat-title">Total Prep Time</div>
            <div className="stat-value flex items-center text-lg">
              <Image
                src="/clockIcon.png"
                alt="clock icon"
                width={50}
                height={50}
              />
              <span className="ml-2">
                {`${recipe.preparation_time_minutes} mins`}
              </span>
            </div>
          </div>
          <div className="stat bg-secondary flex-1 rounded-lg shadow-lg">
            <div className="stat-title">Serves</div>
            <div className="stat-value flex items-center text-lg">
              <Image
                src="/servesIcon.png"
                alt="serving size icon"
                width={50}
                height={50}
              />
              <span className="ml-2">{recipe.serves}</span>
            </div>
          </div>
          <div className="stat bg-accent flex-1 rounded-lg shadow-lg">
            <div className="stat-title">Calories</div>
            <div className="stat-value flex items-center text-lg">
              <Image
                src="/caloriesIcon.png"
                alt="calories icon"
                width={50}
                height={50}
              />
              <span className="ml-2">{recipe.kcal}</span>
            </div>
          </div>
        </section>

        {/* Ingredients and Method Section */}
        <div className="flex flex-col lg:flex-row">
          <section id="recipe-ingredients" className="flex-1 m-4">
            <div className="card bg-primary text-primary-content  rounded-lg shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Ingredients</h2>
                <ul className="list-disc pl-6">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <div className="card-actions justify-end">
                  <button
                    onClick={handleAddToShoppingList}
                    className="btn bg-secondary mt-4"
                    disabled={isButtonDisabled} // Disable the button if true
                  >
                    {buttonText} {/* Display the "+ Shopping List" */}
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section id="recipe-method" className="flex-1">
            <div className="card bg-accent text-primary-content rounded-lg shadow-lg m-4">
              <div className="card-body">
                <h2 className="card-title">Method</h2>
                <ul className="list-disc pl-6">
                  {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/*Sign In Shopping Modal */}
      <Modal
        isOpen={openModalSignInShopping}
        onClose={() => setopenModalSignInShopping(false)}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <form className="space-y-4">
          <p className="text-lg font-semibold mb-4 text-center">
            You need to sign in to add ingredients to your shopping list
          </p>
          <Link href="/signin">
            <button type="submit" className="btn btn-secondary w-full">
              Go to sign in
            </button>
          </Link>
        </form>
      </Modal>

       {/*Sign In MealPlan Modal */}
       <Modal
        isOpen={openModalSignInMealplan}
        onClose={() => setopenModalSignInMealplan(false)}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <form className="space-y-4">
          <p className="text-lg font-semibold mb-4 text-center">
            You need to sign in to add recipes to your meal plan
          </p>
          <Link href="/signin">
            <button type="submit" className="btn btn-secondary w-full">
              Go to sign in
            </button>
          </Link>
        </form>
      </Modal>
    </div>
  );
}
