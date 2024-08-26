import React from "react";
import Task from "./Task";

const IngredientLists = ({ ingredients }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full text-left">
        <tbody>
          {ingredients.length === 0 ? (
            <tr><td>No ingredients found</td></tr>
          ) : (
            ingredients.map((ingredient, index) => (
              <Task key={index} ingredient={ingredient} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientLists;
