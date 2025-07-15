import React from "react";

function Modal({ isOpen, onClose, children, hideHeader = false, title = "Modal" }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-[450px] max-w-xl mx-4 rounded-xl shadow-xl p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()} 
      >
        {!hideHeader && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        )}
        {children}    
      </div>
    </div>
  );
}

export default Modal;
