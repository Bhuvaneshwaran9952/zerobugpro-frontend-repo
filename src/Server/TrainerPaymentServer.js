
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllTrainerPayment = async () => {
  const res = await apiClient.get("/trainerpayment");
  return res.data; 
};

export const getTrainerPaymentById = async (id) => {
  const res = await apiClient.get(`/trainerpayment/${id}`);
  return res.data;
};

export const createTrainerPayment = async (data) => {
  const res = await apiClient.post("/trainerpayment", data);
  return res.data;
};

export const updateTrainerPayment = async (id, data) => {
  const res = await apiClient.put(`/trainerpayment/${id}`, data);
  return res.data;
};

export const patchTrainerPayment = async (id, data) => {
  const res = await apiClient.patch(`/trainerpayment/${id}`, data);
  return res.data;
};

export const deleteTrainerPayment = async (id) => {
  const res = await apiClient.delete(`/trainerpayment/${id}`); 
  return res.data;
};