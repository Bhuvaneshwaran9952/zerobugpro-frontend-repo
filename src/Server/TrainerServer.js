
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllTrainer = async () => {
  const res = await apiClient.get("/trainer");
  return res.data;
};

export const getTrainerById = async (id) => {
  const res = await apiClient.get(`/trainer/${id}`);
  return res.data;
};

export const createTrainer = async (trainerData) => {
  const res = await apiClient.post("/trainer", trainerData);
  return res.data;
};

export const updateTrainer = async (id, data) => {
  const res = await apiClient.put(`/trainer/${id}`, data);
  return res.data;
};

export const patchTrainer = async (id, data) => {
  const res = await apiClient.patch(`trainer/${id}`, data);
  return res.data;
};

export const deleteTrainer = async (id) => {
  const response = await axios.delete(`http://localhost:8000/trainers/${id}`);
  return response.data;
};