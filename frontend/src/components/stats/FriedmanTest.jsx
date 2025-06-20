import { useState } from "react";
import TestSelector from './TestSelector';

export default function FriedmanTest({ patients, simulations, columns, onRun }) {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedSims, setSelectedSims] = useState([]);
  const [column, setColumn] = useState("");

  // Agrupa los checkboxes en filas de 4
  const simRows = [];
  for (let i = 0; i < simulations.length; i += 4) {
    simRows.push(simulations.slice(i, i + 4));
  }

  const handleCheckbox = (id) => {
    setSelectedSims(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-2xl p-10 border border-green-300 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-green-900 mb-6 text-center drop-shadow">Test de Friedman</h2>
      <div className="mb-6">
        <label className="block mb-2 text-green-800 font-semibold">Selecciona paciente</label>
        <select className="w-full border border-green-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-green-400 bg-white shadow-sm" value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)}>
          <option value="">Seleccione</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-green-800 font-semibold">Selecciona simulaciones (2 o más)</label>
        <div className="max-h-40 overflow-y-auto rounded-lg border border-green-100 bg-green-50/30 p-3">
          {simRows.map((row, idx) => (
            <div key={idx} className="flex flex-row gap-6 mb-2">
              {row.map(s => (
                <label key={s.id} className="flex items-center gap-2 cursor-pointer w-1/4">
                  <input
                    type="checkbox"
                    className="accent-green-600 w-5 h-5 rounded focus:ring-2 focus:ring-green-400"
                    checked={selectedSims.includes(s.id)}
                    onChange={() => handleCheckbox(s.id)}
                  />
                  <span className="text-green-900 font-medium">{s.name}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <TestSelector columns={columns} value={column} onChange={setColumn} />
      </div>
      <button
        className="px-8 py-2 rounded-lg bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 w-full"
        disabled={selectedSims.length < 2 || !column}
        onClick={() => onRun(selectedPatient, selectedSims, column)}
      >
        Ejecutar Friedman
      </button>
    </div>
  );
}
