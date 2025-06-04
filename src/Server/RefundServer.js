
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllRefund = async () => {
  const res = await apiClient.get("/refund");
  return res.data;
};

export const getRefundById = async (id) => {
  const res = await apiClient.get(`/refund/${id}`);
  return res.data;
};

export const createRefund = async (studentPaymentData) => {
  const res = await apiClient.post("/refund", studentPaymentData);
  return res.data;
};

export const updateRefund = async (id, data) => {
  const res = await apiClient.put(`/refund/${id}`, data);
  return res.data;
};

export const patchRefund = async (id, data) => {
  const res = await apiClient.patch(`/refund/${id}`, data);
  return res.data;
};

export const deleteRefund = async (id) => {
  return await apiClient.delete(`/refund/${id}`);
};