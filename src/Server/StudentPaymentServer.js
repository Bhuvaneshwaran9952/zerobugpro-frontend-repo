
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllStudentPayment = async () => {
  const res = await apiClient.get("/payment");
  return res.data; // returns only the response body
};

export const getStudentPaymentById = async (id) => {
  const res = await apiClient.get(`/payment/${id}`);
  return res.data;
};

export const createStudentPayment = async (studentPaymentData) => {
  const res = await apiClient.post("/payment", studentPaymentData);
  return res.data;
};

export const updateStudentPayment = async (id, data) => {
  const res = await apiClient.put(`/payment/${id}`, data);
  return res.data;
};

export const patchStudentPayment = async (id, data) => {
  const res = await apiClient.patch(`/payment/${id}`, data);
  return res.data;
};

export const deleteStudentPayment = async (id) => {
  const res = await apiClient.delete(`/payment/${id}`); 
  return res.data;
};