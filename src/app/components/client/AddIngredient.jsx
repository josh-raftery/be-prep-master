"use client";
import React, { useState } from "react";
import Modal from "./Modal"; // Ensure the path is correct
import { FaPlus } from "react-icons/fa";
import { addItem } from "_fake_data/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddIngredients = () => {
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
    <div>
      <button onClick={openModal} className="btn btn-primary w-full">
        ADD NEW ITEM
        <FaPlus className="ml-2" size={20} />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmitNewItem}>
          <h3 className="font-bold text-lg">SHOPPING LIST</h3>
          <div className="modal-action">
            <input
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddIngredients;