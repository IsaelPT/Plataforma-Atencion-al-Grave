import WilcoxonTest from '../components/stats/WilcoxonTest';
import { useState } from 'react';

export default function WilcoxonPage() {
  const [patients] = useState([
    { id: '1', name: 'Paciente 1' },
    { id: '2', name: 'Paciente 2' },
  ]);
  const [simulations] = useState([
    { id: 'sim1', name: 'Simulación 1' },
    { id: 'sim2', name: 'Simulación 2' },
    { id: 'sim3', name: 'Simulación 3' },
  ]);
  const [columns] = useState([
    'tiempo_pre_vam', 'tiempo_vam', 'tiempo_post_vam', 'estadia_uci', 'estadia_post_uci'
  ]);

  const handleRun = (patientId, simIds, column) => {
    // Aquí iría la llamada al backend para el test de Wilcoxon
    alert(`Wilcoxon para paciente ${patientId}, simulaciones ${simIds.join(', ')}, columna ${column}`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
      
        <WilcoxonTest patients={patients} simulations={simulations} columns={columns} onRun={handleRun} />

    </div>
  );
}
