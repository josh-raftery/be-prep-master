
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import Modal from "./Modal";
import { deleteItem, editItem } from "api";
import { useUser } from "./UserProvider"; // Ensure correct path

const Task = ({ ingredient }) => {
  const { user } = useUser(); // Make sure this works and provides a user context
  const user_id = user.user_id; // Ensure this is available and correct
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(ingredient);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleSubmitEditNewItem = (e) => {
    e.preventDefault();
    editItem(user_id, ingredient, taskToEdit)
      .then(() => {
        setOpenModalEdit(false);
        // Refresh data or handle state update as needed
      })
      .catch((error) => {
        console.error("Failed to edit item:", error);
      });
  };

  const handleDeleteItem = () => {
    deleteItem(user_id, ingredient)
      .then(() => {
        setOpenModalDelete(false);
        // Refresh data or handle state update as needed
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors">
      <td className="p-4">{ingredient}</td>
      <td className="p-4 flex gap-4 items-center justify-end">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
          size={20}
        />
        <LuTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-600 hover:text-red-800 transition-colors"
          size={20}
        />
        <Modal isOpen={openModalEdit} onClose={() => setOpenModalEdit(false)} className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">Edit Item</h3>
          <form onSubmit={handleSubmitEditNewItem} className="space-y-4">
            <input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type="text"
              placeholder="Enter new name"
              className="input input-bordered w-full py-2 px-4 rounded-md border-gray-300 shadow-sm"
            />
            <button type="submit" className="btn btn-primary w-full py-2 rounded-md text-white bg-secondary-600 hover:bg-secondary-700 transition-colors">
              Submit
            </button>
          </form>
        </Modal>
        <Modal isOpen={openModalDelete} onClose={() => setOpenModalDelete(false)} className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Confirm Deletion</h3>
          <p className="text-center mb-4">Are you sure you want to delete this item from your basket?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDeleteItem}
              className="btn btn-danger w-full py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              YES
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
