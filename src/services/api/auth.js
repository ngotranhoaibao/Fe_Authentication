import api from "@/services/api/index.js";
export const loginUser = async (payload) => {
    return await api.post("/auth/login", payload);
};

export const register = async (payload) => {
    return await api.post("/auth/register", payload);
};

export const getMe = async () => {
    return await api.get("/auth/me");
}