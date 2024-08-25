"use client";
import React from "react";
import Task from "./Task";

const IngredientLists = ({ ingredients }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => {
            return <Task key={ingredient.ingredient_id} ingredient={ingredient} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientLists;