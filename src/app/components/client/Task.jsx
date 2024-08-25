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
    <tr key={ingredient.ingredient_id}>
      <td className="w-full">{ingredient.name}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={15}
        />
        <Modal isOpen={openModalEdit} onClose={closeModal}>
          <form onSubmit={handleSubmitEditNewItem}>
            <h3 className="font-bold text-lg">EDIT LIST</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
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
        <LuTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={15}
        />
        <Modal isOpen={openModalDelete} onClose={() => setOpenModalDelete(false)}> 
          <h3>Are you sure you want to delete this item from your basket?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteItem(ingredient.id)} className="btn">
              YES
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;