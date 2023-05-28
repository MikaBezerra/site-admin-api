import axios from "axios";

const api = axios.create({
    baseURL: "https://api-site-pessoal.onrender.com/api",
});

export default api;