import React from "react";
import recipeData from "../../../db/data/test/recipeTestData";

const SingleRecipe = () => {
 
  return (<div className=" text-black">
<h1>{recipeData[1].title}</h1>
  </div>);
};

export default SingleRecipe;
