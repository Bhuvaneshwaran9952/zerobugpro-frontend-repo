
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllStudent = async () => {
  const res = await apiClient.get("/users"); 
  return res.data; 
};

export const getStudentById = async (id) => {
  const res = await apiClient.get(`/users/${id}`);
  return res.data;
};

export const createStudent = async (viewData) => {
  const res = await apiClient.post("/users", viewData);
  return res.data;
};

export const updateStudent = async (id, data) => {
  const res = await apiClient.put(`/users/${id}`, data);
  return res.data;
};

export const patchStudent = async (id, data) => {
  const res = await apiClient.patch(`/${id}`, data);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await apiClient.delete(`/users/${id}`); 
  return res.data;
};