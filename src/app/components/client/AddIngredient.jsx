"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import { addItem } from "shopping-list-data/api"; 
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";

const AddIngredients = ({ ingredients }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemValue, setNewItemValue] = useState("");

  const handleSubmitNewItem = async (e) => {
    e.preventDefault();
    try {
      await addItem({
        name: newItemValue,
        ingredient_id: uuidv4(),
      });
      setNewItemValue("");
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-left">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-4 text-left text-xl font-bold">SHOPPING LIST</th>
              <th className="p-4 text-right">
                <div className="flex justify-end">
                  <button
                    onClick={openModal}
                    className="btn btn-primary rounded-full w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    <FaPlus size={20} className="text-white"  />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <Task key={ingredient.ingredient_id} ingredient={ingredient} />
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} className="p-4">
        <form onSubmit={handleSubmitNewItem} className="space-y-4">
          <h3 className="text-xl font-bold mb-4">ADD NEW ITEM</h3>
          <div className="flex flex-col space-y-2">
            <input
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddIngredients;