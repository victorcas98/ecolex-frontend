// Centraliza a URL base da API para facilitar mudanças e uso de variáveis de ambiente.
// Vite projects expose env variables via import.meta.envs.VITE_*
export const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL as string) || 'http://localhost:3000/api';

export default API_BASE_URL;
