import api from '../api/axiosConfig';

export const getProducts = () => api.get("/products?limit=150");
export const getProductSingle = (id) => api.get(`/products/${id}`);