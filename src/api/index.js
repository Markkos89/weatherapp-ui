import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://api.weatherstack.com/`,
});

export default axiosClient;
