import FriedmanTest from '../components/stats/FriedmanTest';
import { useState } from 'react';

export default function FriedmanPage() {
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
    // Aquí iría la llamada al backend para el test de Friedman
    alert(`Friedman para paciente ${patientId}, simulaciones ${simIds.join(', ')}, columna ${column}`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      
        <FriedmanTest patients={patients} simulations={simulations} columns={columns} onRun={handleRun} />

    </div>
  );
}
