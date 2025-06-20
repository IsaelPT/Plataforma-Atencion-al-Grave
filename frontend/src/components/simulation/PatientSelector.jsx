import { useState } from "react";

export default function PatientSelector({ patients, onSelect, onNew }) {
  const [selected, setSelected] = useState("");
  return (
    <div className="flex items-center gap-4 mb-4 bg-blue-50 p-4 rounded-xl border border-blue-200">
      <select
        className="input input-bordered focus:ring-2 focus:ring-blue-400"
        value={selected}
        onChange={e => {
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
      >
        <option value="">Cargar paciente existente</option>
        {patients.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <button
        className="btn px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={onNew}
      >
        Nuevo paciente
      </button>
    </div>
  );
}
