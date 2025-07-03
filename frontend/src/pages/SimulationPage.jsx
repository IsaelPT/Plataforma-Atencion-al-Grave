import React, { useState, useEffect } from 'react';
import PatientTable from '../components/simulation/PatientTable';
import SimulationForm from '../components/simulation/SimulationForm';
import Modal from '../components/ui/Modal';
import SimulationResultsTable from '../components/simulation/SimulationResultsTable';
import { getAllPatients, getPatient, createPatient, simulate, createSimPatient, stats } from '../api/simuci';
import LoadingModal from '../components/ui/LoadingModal';

export default function SimulationPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [simulationResults, setSimulationResults] = useState([]);
  const [recentResults, setRecentResults] = useState({});
  const [errorModal, setErrorModal] = useState({ open: false, patient: null });
  const [pendingSave, setPendingSave] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'success' | 'error'
  const [showSaveStatusModal, setShowSaveStatusModal] = useState(false);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await getAllPatients();
        setPatients(res.data || []);
      } catch {
        setPatients([]);
      }
    }
    fetchPatients();
  }, []);

  const handleSimulateClick = async (patient) => {
    try {
      const res = await getPatient(patient._id);
      setSelectedPatient(res.data);
    } catch {
      setSelectedPatient(patient);
    }
    setShowFormModal(true);
  };

  const handleCloseModal = () => {
    setShowFormModal(false);
    setSelectedPatient(null);
  };

  const handleSimulate = async (form) => {
    setLoading(true);
    try {
      // Mapear y convertir los campos del formulario al modelo esperado por el backend
      const payload = {
        _id: String(form.id),
        edad: Number(form.edad),
        diag1: Number(form.diag1),
        diag2: Number(form.diag2),
        diag3: Number(form.diag3),
        diag4: Number(form.diag4),
        apache: Number(form.apache),
        ins_res: Number(form.insResp),
        vent_art: Number(form.ventArt),
        est_uti: Number(form.estUti),
        tmp_vam: Number(form.tmpVam),
        tmp_est_pre_uti: Number(form.tmpEstPreUti),
        por: Number(form.porciento),
        n_reps: Number(form.nReps),
      };
      let patientData = payload;
      // Si es un paciente nuevo (selectedPatient es null), primero lo crea
      if (!selectedPatient) {
        payload._id = 0;
        await createPatient(payload);
        const all = await getAllPatients();
        setPatients(all.data || []);
      }
      // Simular con los datos actuales (ya sea nuevo o existente)
      const simRes = await simulate(patientData);
      const stadistics = await stats(simRes.data);
      setSimulationResults(stadistics.result || []);
      setPendingSave({ patient: patientData, results: simRes.data });
      setShowFormModal(false);
      setShowResultsModal(true);
      setSelectedPatient(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResults = async () => {
    if (pendingSave) {
      try {
        const res = await createSimPatient(pendingSave.results);
        if (res && res.success) {
          setSaveStatus('success');
          setShowSaveStatusModal(true);
          setRecentResults(prev => {
            const prevArr = prev[pendingSave.patient._id ?? pendingSave.patient.id] || [];
            return {
              ...prev,
              [pendingSave.patient._id ?? pendingSave.patient.id]: [pendingSave.results, ...prevArr].slice(0, 3)
            };
          });
          setPendingSave(null);
          setShowResultsModal(false); // Cierra el modal de resultados inmediatamente
          setTimeout(() => {
            setShowSaveStatusModal(false);
            setSaveStatus(null);
          }, 2000);
        } else {
          setSaveStatus('error');
          setShowSaveStatusModal(true);
          setShowResultsModal(false); // Cierra el modal de resultados en caso de error
        }
      } catch {
        setSaveStatus('error');
        setShowSaveStatusModal(true);
        setShowResultsModal(false); // Cierra el modal de resultados en caso de error
      }
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
      <LoadingModal isOpen={loading} text="Procesando..." />
      <div className="max-w-6xl mx-auto bg-white/70 rounded-2xl shadow-2xl py-10 border border-blue-300 backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center drop-shadow">Simulación de Paciente</h2>
        <PatientTable
          patients={patients}
          onSimulate={handleSimulateClick}
          onShowRecentResults={handleShowRecentResults}
        />
        <div className="flex justify-center mt-6">
          <button
            className="w-1/2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-950 hover:to-blue-700 text-white font-bold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
            onClick={() => {
              setSelectedPatient(null);
              setShowFormModal(true);
            }}
          >
            Simular nuevo paciente
          </button>
        </div>
        <Modal isOpen={showFormModal} onClose={handleCloseModal}>
          <SimulationForm onSubmit={handleSimulate} patient={selectedPatient} onClose={handleCloseModal} />
          
        </Modal>
        <Modal isOpen={showResultsModal} onClose={handleCloseResultsModal}>
          <h3 className="text-xl font-bold mb-4 text-center">Resultados de Simulación</h3>
          <SimulationResultsTable results={simulationResults} />
          {pendingSave && (
            <div className="flex flex-row items-center justify-center mt-6 gap-4">
              <button
                className="px-8 py-2 rounded-lg bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
                onClick={handleSaveResults}
                disabled={saveStatus === 'success'}
              >
                Guardar resultados para paciente #{pendingSave.patient.id}
              </button>
              <button
                style={{ background: '#6C757D' }}
                className="px-8 py-2 rounded-lg text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
                onClick={handleCloseResultsModal}
              >
                Cancelar
              </button>
            </div>
          )}
          {!pendingSave && (
            <div className="flex justify-center mt-6">
              <button
                style={{ background: '#6C757D' }}
                className="px-8 py-2 rounded-lg text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
                onClick={handleCloseResultsModal}
              >
                Volver
              </button>
            </div>
          )}
        </Modal>
        <Modal isOpen={showSaveStatusModal} onClose={() => setShowSaveStatusModal(false)}>
          <div className="flex flex-col items-center justify-center p-6">
            {saveStatus === 'success' && (
              <>
                <span className="text-5xl mb-4 text-green-400">&#10003;</span>
                <h3 className="text-xl font-bold mb-2 text-center text-green-700">¡Resultados guardados exitosamente!</h3>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <span className="text-5xl mb-4 text-red-400">&#10060;</span>
                <h3 className="text-xl font-bold mb-2 text-center text-red-700">Ocurrió un error al guardar los resultados.</h3>
              </>
            )}
          </div>
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
