
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllRepeatedPayments = async () => {
  const res = await apiClient.get("/repeatedpayments");
  return res.data;
};

export const getRepeatedPaymentsById = async (id) => {
  const res = await apiClient.get(`/repeatedpayments/${id}`);
  return res.data;
};

export const createRepeatedPayments = async (studentPaymentData) => {
  const res = await apiClient.post("/repeatedpayments", studentPaymentData);
  return res.data;
};

export const updateRepeatedPayments = async (id, data) => {
  const res = await apiClient.put(`/repeatedpayments/${id}`, data);
  return res.data;
};

export const patchRepeatedPayments = async (id, data) => {
  const res = await apiClient.patch(`/repeatedpayments/${id}`, data);
  return res.data;
};

export const deleteRepeatedPayments = async (id) => {
  return await apiClient.delete(`/repeatedpayments/${id}`);
};