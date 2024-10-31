import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getDespesas = (usuarioId, mes) => api.get(`/despesas/${usuarioId}/${mes || ''}`);
export const createDespesa = (data) => api.post('/despesas', data);
export const updateDespesa = (id, data) => api.put(`/despesas/${id}`, data);
export const deleteDespesa = (id) => api.delete(`/despesas/${id}`);

export default api;