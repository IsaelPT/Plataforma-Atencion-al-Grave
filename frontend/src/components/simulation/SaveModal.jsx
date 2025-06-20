import { useState } from "react";

export default function SaveModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-blue-900/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 border border-blue-200">
        <h2 className="text-lg font-bold mb-4 text-blue-900">Guardar simulación</h2>
        <label htmlFor="saveName" className="block mb-2 text-blue-800">Nombre para los datos:</label>
        <input
          id="saveName"
          className="input input-bordered w-full mb-4 focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="btn px-4 py-2 rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 hover:from-gray-400 hover:to-gray-300 text-gray-800 font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="btn px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => onSave(name)}
            disabled={!name}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
