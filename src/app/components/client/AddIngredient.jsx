"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import { addItem, deleteAllItems  } from "shopping-list-data/api"; 
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";

const AddIngredients = ({ ingredients }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemValue, setNewItemValue] = useState("");
  const [openModalClear, setOpenModalClear] = useState(false);


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

  const handleClearAll = async () => {
    try {
      await deleteAllItems(); // API call to delete all items
      setOpenModalClear(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to clear all items:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-2">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-left">
          <thead>
            <tr className="bg-primary text-black">
              <th className="p-4 text-left text-lg font-bold">Shopping List</th>
              <th className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={openModal}
                    className="btn btn-accent btn-sm flex items-center justify-center bg-accent hover:bg-accent-600 "
                  > Add Item
                    {/* <FaPlus size={20} className="text-black"  /> */}
                  </button>
                  <button
                    onClick={() => setOpenModalClear(true)}
                    className="btn  btn-sm flex items-center justify-center hover:bg-red-600 outline-none border-none"
             
                  >Clear All</button>
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
          <h3 className="text-lg font-bold mb-4">Add New Item</h3>
          <div className="flex flex-col space-y-2">
            <input
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              type="text"
              placeholder="Item and quantity"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-accent w-full">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={openModalClear} onClose={() => setOpenModalClear(false)} className="p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Confirm Clear All</h3>
        <p className="text-center mb-4">Are you sure you want to clear all items from your shopping list?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleClearAll}
            className="btn btn-danger w-full py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddIngredients;