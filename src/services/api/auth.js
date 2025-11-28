import api from "@/services/api/index.js";

export const loginUser = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data; 
};

export const register = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data; 
};
