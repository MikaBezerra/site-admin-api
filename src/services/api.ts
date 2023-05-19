import axios from "axios";

const api = axios.create({
    baseURL:  "https://json-server-exemplo.onrender.com/",
});

export default api;