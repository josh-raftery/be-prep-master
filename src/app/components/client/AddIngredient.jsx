"use client";
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { FaPlus } from 'react-icons/fa';
import { addItem, getBasket } from 'api';
import { useRouter } from 'next/navigation';
import Task from './Task';

const AddIngredients = ({ ingredients = [], user_id }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');
  const [updatedIngredients, setUpdatedIngredients] = useState(ingredients);

  useEffect(() => {
    setUpdatedIngredients(ingredients);
  }, [ingredients]);

  
  const handleSubmitNewItem = (e) => {
    console.log("ARE YOU GETTING USED")
    e.preventDefault();
    addItem(user_id, newItemValue)
      .then(() => {
        setNewItemValue('');
        setIsModalOpen(false);
        return getBasket(user_id);
      })
      .then((data) => {
        setUpdatedIngredients(data.ingredients); 
      })
      .catch((error) => {
        console.error('Failed to add item:', error);
      });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
                    <FaPlus size={20} className="text-white" />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {updatedIngredients.length > 0 ? (
              updatedIngredients.map((ingredient, index) => (
                <Task key={index} ingredient={ingredient} user_id={user_id} />
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-4 text-center">No ingredients found</td>
              </tr>
            )}
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
