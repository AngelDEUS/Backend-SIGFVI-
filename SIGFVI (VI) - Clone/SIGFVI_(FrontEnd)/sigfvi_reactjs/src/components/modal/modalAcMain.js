/*
    * Acciones del los modales.
*/
import React from 'react';
import "./modal.css";

const Modal = ({ title, onClose, isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
