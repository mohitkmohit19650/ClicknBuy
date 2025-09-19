import api from "../api/axiosConfig";

export const login = (credentials) => api.post("/auth/login", credentials);
export const refreshToken = () => api.post("/auth/refresh");
export const logout = () => api.post("/auth/logout");