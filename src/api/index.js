import axios from "axios";

const axiosClient = axios.create({
  // baseURL: `http://api.weatherstack.com/`,
  baseURL: `http://localhost:8080/api/`,
});

export default axiosClient;
