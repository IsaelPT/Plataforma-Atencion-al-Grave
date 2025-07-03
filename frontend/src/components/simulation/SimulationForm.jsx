import { useState } from "react";
import { labels, tipoVentilacionOptions, diagPreuciOptions, insufRespOptions } from "./simulationFormConstants";

export default function SimulationForm({ onSubmit, patient, onClose }) {
  const [form, setForm] = useState({
    id: patient?._id ?? 0,
    edad: patient?.edad ?? 14,
    apache: patient?.apache ?? 5,
    insResp: patient?.ins_res ?? 0,
    ventArt: patient?.vent_ar ?? 0,
    diag1: patient?.diag1 ?? 0,
    diag2: patient?.diag2 ?? 0,
    diag3: patient?.diag3 ?? 0,
    diag4: patient?.diag4 ?? 0,
    diagEgr2: 0,
    estUti: patient?.est_uti ?? 0,
    tmpVam: patient?.tmp_vam ?? 24,
    tmpEstPreUti: patient?.tmp_est_pre_uti ?? 0,
    porciento: patient?.por ?? 10,
    nReps: patient?.n_reps ?? 100,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Clase base para todos los campos: tamaño uniforme, padding compacto, fuente igual, máximo ancho razonable
  const fieldClass =
    "border border-blue-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-400 bg-white w-full shadow-sm appearance-none min-w-0 max-w-[220px] mx-auto";
  // Clase para selects: agrega un ícono de flecha
  const selectClass = `${fieldClass} pr-8 bg-[url(data:image/svg+xml;utf8,<svg fill='none' stroke='%233b82f6' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>)] bg-no-repeat bg-[right_0.75rem_center]`;

  return (
    <form className="w-full" onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
      {/* Input oculto para el id del patient */}
      <input type="hidden" name="id" value={form.id} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Columna 1 */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="edad" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.edad}</label>
            <input id="edad" name="edad" type="number" min={14} max={90} required className={fieldClass} value={form.edad} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="apache" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.apache}</label>
            <input id="apache" name="apache" type="number" min={0} max={36} required className={fieldClass} value={form.apache} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="insResp" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.insResp}</label>
            <select id="insResp" name="insResp" required className={selectClass} value={form.insResp} onChange={handleChange}>
              <option value= {0} disabled>Seleccione...</option>
              {Object.entries(insufRespOptions).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ventArt" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.ventArt}</label>
            <select id="ventArt" name="ventArt" required className={selectClass} value={form.ventArt} onChange={handleChange}>
              <option value= {0} disabled>Seleccione...</option>
              {Object.entries(tipoVentilacionOptions).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Columna 2 */}
        <div className="flex flex-col gap-4">
          {["diag1", "diag2", "diag3", "diag4"].map(key => (
            <div key={key}>
              <label htmlFor={key} className="text-black mb-1 block text-base font-semibold tracking-wide">{labels[key]}</label>
              <select id={key} name={key} required className={selectClass} value={form[key]} onChange={handleChange}>
                <option value= {0} disabled>Seleccione...</option>
                {Object.entries(diagPreuciOptions).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {/* Columna 3 */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="diagEgr2" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.diagEgr2}</label>
            <select id="diagEgr2" name="diagEgr2" required className={selectClass} value={form.diagEgr2} onChange={handleChange}>
              <option value= {0} disabled>Seleccione...</option>
              {Object.entries(diagPreuciOptions).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="estUti" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.estUti}</label>
            <input id="estUti" name="estUti" type="number" min={0} required className={fieldClass} value={form.estUti} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="tmpVam" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.tmpVam}</label>
            <input id="tmpVam" name="tmpVam" type="number" min={0} required className={fieldClass} value={form.tmpVam} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="tmpEstPreUti" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.tmpEstPreUti}</label>
            <input id="tmpEstPreUti" name="tmpEstPreUti" type="number" min={0} required className={fieldClass} value={form.tmpEstPreUti} onChange={handleChange} />
          </div>
        </div>
      </div>
      {/* Fila aparte para porciento y corridas */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
        <div className="flex flex-col items-center w-full md:w-1/4">
          <label htmlFor="porciento" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.porciento}</label>
          <input id="porciento" name="porciento" type="number" min={0} max={100} required className={fieldClass + " text-center"} value={form.porciento} onChange={handleChange} />
        </div>
        <div className="flex flex-col items-center w-full md:w-1/4">
          <label htmlFor="nReps" className="text-black mb-1 block text-base font-semibold tracking-wide">{labels.nReps}</label>
          <input id="nReps" name="nReps" type="number" min={1} required className={fieldClass + " text-center"} value={form.nReps} onChange={handleChange} />
        </div>
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <button
          type="submit"
          className="px-8 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Simular
        </button>
        <button
          type="button"
          style={{ background: '#6C757D' }}
          className="px-8 py-2 rounded-lg text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
          onClick={onClose}
        >
          Volver
        </button>
      </div>
    </form>
  );
}
