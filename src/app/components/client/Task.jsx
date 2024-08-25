import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteItem, editItem } from "_fake_data/api";

const Task = ({ ingredient }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(ingredient.name);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleSubmitEditNewItem = async (e) => {
    e.preventDefault();
    try {
      await editItem({
        id: ingredient.id,
        name: taskToEdit,
        ingredient_id: ingredient.ingredient_id,
      });
      setOpenModalEdit(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to edit item:", error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await deleteItem(ingredient.id);
      setOpenModalDelete(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors">
      <td className="p-4">{ingredient.name}</td>
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
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
