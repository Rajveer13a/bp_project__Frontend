
import axios from "axios";

import eventEmitter from "./eventEmitter";

// import { resetData } from "@/Redux/Slices/AuthSlice";
// import { store } from '../Redux/store.js';






const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

axiosInstance.defaults.withCredentials = true

axiosInstance.interceptors.response.use(
    (response) => {

        return response

    }
    ,
    async (err) => {

        if (err.response.status === 401) {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/refreshToken`, {
                    withCredentials: true
                });
                return axiosInstance(err.config);

            } catch (err) {
                
                eventEmitter.emit('resetAuthState');

                throw err
                
                
            }


        } else {
            throw err
        }

    }
)

export default axiosInstance;