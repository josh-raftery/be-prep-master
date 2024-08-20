import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

 function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/getRecipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the recipes!", error);
      });
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.recipe_id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}

module.exports = RecipesPage