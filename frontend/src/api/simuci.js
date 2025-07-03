import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080/simuci';

// Patients
export const getAllPatients = async () => {
  const res = await axios.get(`${API_BASE}/patient/all`);
  return res.data;
};

export const getPatient = async (id) => {
  const res = await axios.get(`${API_BASE}/patient`, { params: { id } });
  return res.data;
};

export const createPatient = async (patient) => {
  const res = await axios.post(`${API_BASE}/patient`, patient);
  return res.data;
};

// Simulation
export const simulate = async (patient) => {
  const res = await axios.post(`${API_BASE}/simulation`, patient);
  return res.data;
};

// SimPatient
export const getAllSimPatients = async (id) => {
  const res = await axios.get(`${API_BASE}/sim_patient/all`, { params: { id } });
  return res.data;
};

export const createSimPatient = async (simulation) => {
  const res = await axios.post(`${API_BASE}/sim_patient`, simulation);
  return res.data;
};

// Estadística
export const wilcoxonTest = async (x, y, field) => {
  const res = await axios.post(`${API_BASE}/simulation/wilcoxon`, { x, y }, { params: { field } });
  return res.data;
};

export const friedmanTest = async (samples, field) => {
  const res = await axios.post(`${API_BASE}/simulation/friedman`, { samples }, { params: { field } });
  return res.data;
};

export const stats = async (data) => {
  const res = await axios.post(`${API_BASE}/simulation/stats`, data);
  return res.data;
};

// Prediction
export const predict = async (patient) => {
  const res = await axios.post(`${API_BASE}/simulation/predict`, patient);
  return res.data;
};
