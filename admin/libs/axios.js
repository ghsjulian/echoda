import axios from "axios";

// const api = "https://auth-app-ie66.onrender.com/api/v1/user"
//const api = "http://localhost:3000/api/v1/admin";
const api = "https://api.agatuvoice.online/api/v1/admin";

const axiosConfig = axios.create({
  baseURL: api,
  withCredentials: true,
});

export default axiosConfig;
