export default function SimulationResultsTable({ results }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white/90 rounded-xl shadow-lg border border-blue-200">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-blue-900 text-center">Variable</th>
            <th className="px-4 py-2 text-blue-900 text-center">Media</th>
            <th className="px-4 py-2 text-blue-900 text-center">Desv. Est.</th>
            <th className="px-4 py-2 text-blue-900 text-center">Min</th>
            <th className="px-4 py-2 text-blue-900 text-center">Max</th>
            <th className="px-4 py-2 text-blue-900 text-center">IC 95% Inferior</th>
            <th className="px-4 py-2 text-blue-900 text-center">IC 95% Superior</th>
          </tr>
        </thead>
        <tbody>
          {results.map(row => (
            <tr key={row.variable} className="even:bg-blue-50 hover:bg-blue-100">
              <td className="px-4 py-2 font-semibold text-blue-800 text-center">{row.variable}</td>
              <td className="px-4 py-2 text-center">{row.mean}</td>
              <td className="px-4 py-2 text-center">{row.std}</td>
              <td className="px-4 py-2 text-center">{row.min}</td>
              <td className="px-4 py-2 text-center">{row.max}</td>
              <td className="px-4 py-2 text-green-700 font-bold text-center">{row.ciLower}</td>
              <td className="px-4 py-2 text-green-700 font-bold text-center">{row.ciUpper}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
