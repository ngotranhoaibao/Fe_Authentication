import api from "@/services/api/index.js";

export const loginUser = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res; 
};

export const register = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.data; 
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res; 
};