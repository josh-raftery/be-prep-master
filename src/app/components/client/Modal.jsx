import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box p-6 bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ">
        <form method="dialog">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form> 
       {children}
      </div>
    </dialog>
  );
};

export default Modal;

