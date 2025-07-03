import WilcoxonTest from '../components/stats/WilcoxonTest';
import { useState, useEffect } from 'react';
import { getAllPatients } from '../api/simuci';

export default function WilcoxonPage() {
  const [patients, setPatients] = useState([]);
  const [columns] = useState([
    'tiempo_pre_vam', 'tiempo_vam', 'tiempo_post_vam', 'estadia_uci', 'estadia_post_uci'
  ]);

  useEffect(() => {
    getAllPatients().then(res => {
      // Asume que la respuesta es { success: true, data: [...] }
      if (res.success && Array.isArray(res.data)) {
        setPatients(res.data.map(p => ({ id: p._id, name: p._id.slice(-10) })));
      }
    });
  }, []);

  const handleRun = (patientId, simIds, column) => {
    // Aquí iría la llamada al backend para el test de Wilcoxon
    alert(`Wilcoxon para patient ${patientId}, simulaciones ${simIds.join(', ')}, columna ${column}`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
      
        <WilcoxonTest patients={patients} columns={columns} onRun={handleRun} />

    </div>
  );
}
