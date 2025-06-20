import React from 'react';

export default function TestSelector({ columns, value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="testColumn" className="block mb-1 font-semibold text-blue-800">Columna a comparar</label>
      <select
        id="testColumn"
        className="input input-bordered focus:ring-2 focus:ring-blue-400"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">Seleccione columna</option>
        {columns.map(col => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>
    </div>
  );
}
