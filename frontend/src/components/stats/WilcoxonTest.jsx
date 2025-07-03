import { useState, useEffect } from "react";
import TestSelector from './TestSelector';
import { getAllSimPatients, wilcoxonTest } from '../../api/simuci';

export default function WilcoxonTest({ patients, columns }) {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [simulations, setSimulations] = useState([]);
  const [selectedSims, setSelectedSims] = useState([]);
  const [column, setColumn] = useState("");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (selectedPatient) {
      getAllSimPatients(selectedPatient).then(res => {
        // Respuesta esperada: [{ id, nombre, sim_patients: [...] }, ...]
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSimulations(res.data.map(sim => ({
            id: sim._id,
            name: sim.nombre,
            sim_patients: sim.sim_patients
          })));
        } else {
          setSimulations([]);
        }
        setSelectedSims([]);
      });
    } else {
      setSimulations([]);
      setSelectedSims([]);
    }
  }, [selectedPatient]);

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

  const handleRun = async () => {
    if (column === "") {
      setErrorMsg("Debe escoger una columna para comparar.");
      return;
    }
    if (selectedSims.length === 2) {
      const simA = simulations.find(s => s.id === selectedSims[0]);
      const simB = simulations.find(s => s.id === selectedSims[1]);
      if (simA && simB) {
        const res = await wilcoxonTest(simA.sim_patients, simB.sim_patients, column);
        setResult(res);
        setErrorMsg("");
      }
    }
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-2xl p-10 border border-purple-300 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center drop-shadow">Test de Wilcoxon</h2>
      <div className="mb-6">
        <label className="block mb-2 text-purple-800 font-semibold">Selecciona patient</label>
        <select className="w-full border border-purple-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-purple-400 bg-white shadow-sm" value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)}>
          <option value="">Seleccione</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-purple-800 font-semibold">Selecciona 2 simulaciones</label>
        <div className="max-h-40 overflow-y-auto rounded-lg border border-purple-100 bg-purple-50/30 p-3">
          {simRows.map((row, idx) => (
            <div key={idx} className="flex flex-row gap-6 mb-2">
              {row.map(s => (
                <label key={s.id} className="flex items-center gap-2 cursor-pointer w-1/4">
                  <input
                    type="checkbox"
                    className="accent-purple-600 w-5 h-5 rounded focus:ring-2 focus:ring-purple-400"
                    checked={selectedSims.includes(s.id)}
                    onChange={() => handleCheckbox(s.id)}
                    disabled={selectedSims.length === 2 && !selectedSims.includes(s.id)}
                  />
                  <span className="text-purple-900 font-medium">{s.name}</span>
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
        className={`px-8 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 w-full ${selectedSims.length !== 2 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
        disabled={selectedSims.length !== 2}
        onClick={handleRun}
      >
        Ejecutar Wilcoxon
      </button>
      {errorMsg && (
        <div className="mt-4 text-center text-red-600 font-semibold">{errorMsg}</div>
      )}
      {result && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <pre className="text-sm text-purple-900 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
