// src/config/apiClient.js
import axios from 'axios';
import { API_ENDPOINT } from './APIs';


const apiIntercepClient = axios.create({
    baseURL: API_ENDPOINT,
});

apiIntercepClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    console.log("Token in interceptor: ", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiIntercepClient;
