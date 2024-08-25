import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
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