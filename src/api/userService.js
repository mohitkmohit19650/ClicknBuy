import api from '../api/axiosConfig';

export const getUserProfile = () => api.get("/user/profile");
export const updateUserProfile = (data) => api.put("/user/profile", data);
