import axios from "axios";

const API_URL = "http://localhost:3003/tasks";

export const getTasks = () => {
  return axios.get(API_URL);
};

export const createTask = (task: any) => {
  return axios.post(API_URL, task);
};

export const updateTask = (id: string, task: any) => {
  return axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = (id: string) => {
  return axios.delete(`${API_URL}/${id}`);
};
