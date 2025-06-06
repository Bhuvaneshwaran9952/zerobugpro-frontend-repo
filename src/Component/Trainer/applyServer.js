
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllApply = async () => {
  const res = await apiClient.get("/apply");
  return res.data || []; 
};

export const getApplyById = async (id) => {
  const res = await apiClient.get(`/apply/${id}`);
  return res.data;
};

export const createApply = async (data) => {
  return await apiClient.post("/apply", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateApply = async (id, formData) => {
  return await apiClient.put(`/apply/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const patchApply = async (id, data) => {
  const res = await apiClient.patch(`/apply/${id}`, data);
  return res.data;
};

export const deleteApply = async (id) => {
  return await apiClient.delete(`/apply/${id}`);
};