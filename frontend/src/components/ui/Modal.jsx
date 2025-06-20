import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="bg-white/80 rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative animate-fade-in border border-blue-200 flex flex-col items-center justify-center mx-auto my-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
