import React from "react";
import Modal from "../ui/Modal";

export default function LoadingModal({ isOpen, text = "Procesando simulación..." }) {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <div className="flex flex-col items-center justify-center min-w-[220px] min-h-[120px] h-full w-full">
        <div className="mb-4 flex items-center justify-center">
          <span className="inline-block w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
        </div>
        <p className="text-lg font-semibold text-blue-800 text-center drop-shadow">{text}</p>
      </div>
    </Modal>
  );
}
