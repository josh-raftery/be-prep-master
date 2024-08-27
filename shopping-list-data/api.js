import { resolve } from "styled-jsx/css";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async () => {
  const res = await fetch(`${baseUrl}/ingredients`, { cache: "no-store" });
  const todos = await res.json();
  return todos;
};

export const addItem = async (addItem) => {
  const res = await fetch(`${baseUrl}/ingredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addItem),
  });
  const newAddItem = await res.json();
  return newAddItem;
};

export const editItem = async (itemToUpdate) => {
    const { id, name, ingredient_id } = itemToUpdate;
  
    try {
      const res = await fetch(`${baseUrl}/ingredients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, ingredient_id }),
      });
      const updatedItem = await res.json();
      return updatedItem;
    } catch (error) {
    }
  };

  export const deleteItem = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/ingredients/${id}`, {
        method: "DELETE",
      });
  
      return await response.json(); 
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };