import axios from "axios";
import baseURL from "../config";

const owneraxiosInstance = axios.create({
    baseURL: baseURL, 
  });


  owneraxiosInstance.interceptors.request.use(
    (config) => {
        const tokenInfo = localStorage.getItem('ownerInfo')
        if(tokenInfo){
          if(config.headers) config.headers.token = `Bearer ${JSON.parse(localStorage.getItem('ownerInfo')).token}`;
        }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default owneraxiosInstance;