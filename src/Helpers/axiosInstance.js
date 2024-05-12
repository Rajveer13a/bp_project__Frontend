import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://127.0.0.1:5575/api/v1' ;

axiosInstance.defaults.withCredentials = true

export default axiosInstance ;