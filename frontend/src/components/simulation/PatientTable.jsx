import React from "react";

export default function PatientTable({ patients, onSimulate, onShowRecentResults }) {
  return (
    <table className="w-11/12 max-w-5xl mx-auto rounded-2xl mb-8 text-center table-fixed">
      <colgroup>
        <col style={{ width: '10%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '30%' }} />
      </colgroup>
      <thead>
        <tr>
          <th className="px-4 py-3 font-bold text-lg rounded-tl-2xl">ID</th>
          <th className="px-4 py-3 font-bold text-lg">Edad</th>
          <th className="px-4 py-3 font-bold text-lg">APACHE</th>
          <th className="px-4 py-3 font-bold text-lg rounded-tr-2xl">Acción</th>
        </tr>
      </thead>
      <tbody>
        {patients.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-6 text-gray-500">No hay pacientes registrados</td>
          </tr>
        ) : (
          patients.map((p, idx) => (
            <tr key={p.id} className={`border-b last:border-b-0 hover:bg-blue-100 transition`}>
              <td className="px-4 py-3 font-semibold text-blue-800">{p.id}</td>
              <td className="px-4 py-3">{p.edad}</td>
              <td className="px-4 py-3">{p.apache}</td>
              <td className="px-4 py-3">
                <div className="flex flex-row gap-3 justify-center items-center">
                  <button
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => onSimulate(p)}
                  >
                    Simular
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-bold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={() => onShowRecentResults(p)}
                  >
                    Ver resultados
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
