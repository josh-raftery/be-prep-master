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

  const closeModal = () => {
    setOpenModalEdit(false);
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      setOpenModalDelete(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="p-4">{ingredient.name}</td>
      <td className="p-4 flex gap-4 justify-end items-center">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500 hover:text-blue-700 transition-colors"
          size={20}
        />
        <LuTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500 hover:text-red-700 transition-colors"
          size={20}
        />
        <Modal isOpen={openModalEdit} onClose={closeModal} className="p-4">
          <form onSubmit={handleSubmitEditNewItem} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">EDIT LIST</h3>
            <div className="flex flex-col space-y-2">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
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
        <Modal isOpen={openModalDelete} onClose={() => setOpenModalDelete(false)} className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this item from your basket?</h3>
            <div className="flex gap-4 justify-end">
              <button onClick={() => handleDeleteItem(ingredient.id)} className="btn btn-danger w-full">
                YES
              </button>
              <button onClick={() => setOpenModalDelete(false)} className="btn btn-secondary w-full">
                NO
              </button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
