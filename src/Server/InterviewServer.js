
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllInterview = async () => {
  const res = await apiClient.get("/interviews");
  return res.data || []; 
};

export const getInterviewById = async (id) => {
  const res = await apiClient.get(`/interviews/${id}`);
  return res.data;
};

export const createInterview = async (data) => {
  return await apiClient.post("/interviews", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateInterview = async (id, formData) => {
  return await apiClient.put(`/interviews/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const patchInterview= async (id, data) => {
  const res = await apiClient.patch(`/interviews/${id}`, data);
  return res.data;
};

export const deleteInterview = async (id) => {
  return await apiClient.delete(`/interviews/${id}`);
};