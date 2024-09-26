"use client";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import Modal from "@components/client/Modal.jsx";
import { patchUserShoppingList } from "api";

export default function ShoppingList({ params }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({ oldItem: "", newItem: "" });
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [openModalClearAll, setOpenModalClearAll] = useState(false);
  const [error, setError] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const { user_id } = params;

  useEffect(() => {
    fetch(`https://be-prep-master.vercel.app/api/users/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setShoppingList(data.user.shopping_list);
      })
      .catch((err) => {
        console.error("Error fetching current shopping list:", err);
      });
  }, [user_id]);

  // One function to overwrite the user's shopping list in the backend
  function updateShoppingList(newList) {
    setShoppingList(newList);
    patchUserShoppingList(user_id, newList);
  }

  function handleDeleteOne() {
    const newList = shoppingList.filter((item) => item !== itemToDelete); // Remove the item
    updateShoppingList(newList);
    setOpenModalDelete(false);
  }

  function handleAddItem(e) {
    e.preventDefault();
    if (newItem.trim() == "") {
      setError(true);
      return;
    }
    const newList = [...shoppingList, newItem];
    updateShoppingList(newList);
    setOpenModalAdd(false);
    setNewItem("");
    setError(false);
  }

  function handleEditItem(e) {
    e.preventDefault();
    const trimmedNewItem = itemToEdit.newItem.trim();
    if (trimmedNewItem === "") {
      setError(true);
      return;
    }
    const newList = shoppingList.map((item) =>
      item === itemToEdit.oldItem ? trimmedNewItem : item
    );
    updateShoppingList(newList);
    setOpenModalEdit(false);
    setError(false);
  }

  function handleDeleteAll() {
    const newList = [];
    updateShoppingList(newList);
    setOpenModalClearAll(false);
  }

  return (
    <>
      <section className="flex flex-col items-center pb-10 m-4">
        <div className="card bg-white w-96 shadow-xl rounded-lg p-4">
          <div>
            <table className="table table-zebra w-full text-left">
              <thead>
                <tr className="bg-primary text-black">
                  <th className="p-4 text-left text-lg font-bold">
                    Shopping List
                  </th>
                  <th className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setOpenModalAdd(true)}
                        className="btn btn-accent btn-sm flex items-center justify-center bg-accent hover:bg-accent-600 "
                      >
                        Add Item
                      </button>
                      <button
                        onClick={() => setOpenModalClearAll(true)}
                        className="btn  btn-sm flex items-center justify-center hover:bg-red-600 outline-none border-none"
                      >
                        Clear All
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {shoppingList.map((item) => (
                  <tr key={item}>
                    <td className="p-4">{item}</td>

                    {/* Edit and Delete icons */}
                    <td className="p-4 text-right">
                      <div className="flex gap-4 justify-end">
                        <FiEdit
                          onClick={() => {
                            setItemToEdit({ oldItem: item, newItem: "" });
                            setOpenModalEdit(true);
                          }}
                          cursor="pointer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          size={20}
                        />
                        <LuTrash2
                          onClick={() => {
                            setItemToDelete(item);
                            setOpenModalDelete(true);
                          }}
                          cursor="pointer"
                          className="text-red-600 hover:text-red-800 transition-colors"
                          size={20}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add Item Modal */}
      <Modal
        isOpen={openModalAdd}
        onClose={() => {
          setOpenModalAdd(false)
          setError(false)
        }}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <form onSubmit={handleAddItem} className="space-y-4">
          <p className="text-lg font-semibold mb-4 text-center">Add New Item</p>
          {error && (
            <p className="text-red-500 text-sm text-center">
              Item name cannot be empty.
            </p>
          )}
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            placeholder="Item name"
            className="input input-bordered w-full py-2 px-4 rounded-md border-gray-300 shadow-sm"
          />
          <button type="submit" className="btn btn-accent w-full">
            Submit
          </button>
        </form>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        isOpen={openModalEdit}
        onClose={() => {
          setOpenModalEdit(false)
          setError(false)
        }}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <p className="text-lg font-semibold mb-4 text-center">Edit Item</p>
        {error && (
          <p className="text-red-500 text-sm text-center">
            Item name cannot be empty.
          </p>
        )}
        <form onSubmit={handleEditItem} className="space-y-4">
          <input
            value={itemToEdit.newItem}
            onChange={(e) =>
              setItemToEdit({ ...itemToEdit, newItem: e.target.value })
            }
            type="text"
            placeholder="Edit item"
            className="input input-bordered w-full py-2 px-4 rounded-md border-gray-300 shadow-sm"
          />
          <button type="submit" className="btn btn-accent w-full">
            Submit
          </button>
        </form>
      </Modal>

      {/* Delete Item Modal */}
      <Modal
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <p className="text-lg font-semibold mb-4 text-center">
          Confirm Deletion
        </p>
        <p className="text-center mb-4">
          Are you sure you want to delete this item from your shopping list?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDeleteOne}
            className="btn text-white bg-red-600 w-full"
          >
            Yes
          </button>
        </div>
      </Modal>

      {/* Clear All Modal */}
      <Modal
        isOpen={openModalClearAll}
        onClose={() => setOpenModalClearAll(false)}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <p className="text-lg font-semibold mb-4 text-center">Clear All</p>
        <p className="text-center mb-4">
          Are you sure you want to delete all items from your shopping list?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDeleteAll}
            className="btn text-white bg-red-600 w-full"
          >
            Yes
          </button>
        </div>
      </Modal>
    </>
  );
}
