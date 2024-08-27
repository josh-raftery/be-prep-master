"use client";
import React from "react";
import Task from "./Task";

const IngredientLists = ({ ingredients }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full text-left">
        <tbody>
          {ingredients.map((ingredient) => (
            <Task key={ingredient.ingredient_id} ingredient={ingredient} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientLists;