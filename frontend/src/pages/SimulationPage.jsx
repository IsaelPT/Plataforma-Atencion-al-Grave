import React, { useState } from 'react';
import PatientTable from '../components/simulation/PatientTable';
import SimulationForm from '../components/simulation/SimulationForm';
import Modal from '../components/ui/Modal';
import SimulationResultsTable from '../components/simulation/SimulationResultsTable';

export default function SimulationPage() {
  const [patients] = useState([
    { id: 1, edad: 65, apache: 18 },
    { id: 2, edad: 52, apache: 22 },
    { id: 3, edad: 74, apache: 30 },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [simulationResults, setSimulationResults] = useState([]);
  const [recentResults, setRecentResults] = useState({});
  const [errorModal, setErrorModal] = useState({ open: false, patient: null });
  const [pendingSave, setPendingSave] = useState(null);

  const handleSimulateClick = (patient) => {
    setSelectedPatient(patient);
    setShowFormModal(true);
  };

  const handleCloseModal = () => {
    setShowFormModal(false);
    setSelectedPatient(null);
  };

  const handleSimulate = (form) => {
    // Simulación dummy (reemplazar por lógica real)
    const dummyResults = [
      { variable: 'Estancia', mean: 7.2, std: 1.1, min: 5, max: 9, ciLower: 6.8, ciUpper: 7.6 },
      { variable: 'VAM', mean: 4.5, std: 0.8, min: 3, max: 6, ciLower: 4.2, ciUpper: 4.8 },
    ];
    setSimulationResults(dummyResults);
    setPendingSave({ patient: selectedPatient, results: dummyResults });
    setShowFormModal(false);
    setShowResultsModal(true);
    setSelectedPatient(null);
  };

  const handleSaveResults = () => {
    if (pendingSave) {
      setRecentResults(prev => {
        const prevArr = prev[pendingSave.patient.id] || [];
        return {
          ...prev,
          [pendingSave.patient.id]: [pendingSave.results, ...prevArr].slice(0, 3)
        };
      });
      setPendingSave(null);
      setShowResultsModal(false);
    }
  };

  const handleShowRecentResults = (patient) => {
    const resultsArr = recentResults[patient.id];
    if (resultsArr && resultsArr.length > 0) {
      setSimulationResults(resultsArr[0]);
      setShowResultsModal(true);
      setPendingSave(null);
    } else {
      setErrorModal({ open: true, patient });
    }
  };

  const handleCloseResultsModal = () => {
    setShowResultsModal(false);
    setPendingSave(null);
  };

  const handleCloseErrorModal = () => {
    setErrorModal({ open: false, patient: null });
  };

  return (
    <div className="p-10 bg-gradient-to-br from-blue-200 via-blue-250 to-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white/70 rounded-2xl shadow-2xl py-10 border border-blue-300 backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center drop-shadow">Simulación de Paciente</h2>
        <PatientTable
          patients={patients}
          onSimulate={handleSimulateClick}
          onShowRecentResults={handleShowRecentResults}
        />
        <Modal isOpen={showFormModal} onClose={handleCloseModal}>
          {selectedPatient && (
            <SimulationForm onSubmit={handleSimulate} patient={selectedPatient} />
          )}
        </Modal>
        <Modal isOpen={showResultsModal} onClose={handleCloseResultsModal}>
          <h3 className="text-xl font-bold mb-4 text-center">Resultados de Simulación</h3>
          <SimulationResultsTable results={simulationResults} />
          {pendingSave && (
            <div className="flex justify-center mt-6">
              <button
                className="px-8 py-2 rounded-lg bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
                onClick={handleSaveResults}
              >
                Guardar resultados para paciente #{pendingSave.patient.id}
              </button>
            </div>
          )}
        </Modal>
        <Modal isOpen={errorModal.open} onClose={handleCloseErrorModal}>
          <div className="flex flex-col items-center justify-center p-6">
            <span className="text-5xl mb-4 text-red-400">&#9888;</span>
            <h3 className="text-xl font-bold mb-2 text-center text-red-700">No hay datos registrados</h3>
            <p className="text-center text-gray-700 mb-2">Aún no se han guardado resultados de simulación para el paciente #{errorModal.patient?.id}.</p>
            <button
              className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleCloseErrorModal}
            >
              Cerrar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
