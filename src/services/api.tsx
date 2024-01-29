import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://backend-social-media-pichau.onrender.com"
});

export default api;