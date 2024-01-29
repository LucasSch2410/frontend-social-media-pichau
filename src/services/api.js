import axios from "axios";

export const api = axios.create({
    baseURL: "https://backend-social-media-pichau.onrender.com"
})