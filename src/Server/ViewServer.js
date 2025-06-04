
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllView = async () => {
  const res = await apiClient.get("/view");
  return res.data;
};

export const getViewById = async (id) => {
  const res = await apiClient.get(`/view/${id}`);
  return res.data;
};

export const createView = async (viewData) => {
  const res = await apiClient.post("/view", viewData);
  return res.data;
};

export const updateView = async (id, data) => {
  const res = await apiClient.put(`/view/${id}`, data);
  return res.data;
};

export const patchView = async (id, data) => {
  const res = await apiClient.patch(`/${id}`, data);
  return res.data;
};

export const deleteView = async (id) => {
  const res = await apiClient.delete(`/view/${id}`); 
  return res.data;
};