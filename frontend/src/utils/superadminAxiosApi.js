import axios from "axios";
import baseURL from "../config";

const superadminaxiosInstance = axios.create({
    baseURL: baseURL, 
  });


  superadminaxiosInstance.interceptors.request.use(
    (config) => {
        const tokenInfo = localStorage.getItem('superadminInfo')
        if(tokenInfo){
          if(config.headers) config.headers.token = `Bearer ${JSON.parse(localStorage.getItem('superadminInfo')).token}`;
        }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default superadminaxiosInstance;