import axios from "axios";
import baseURL from "../config";

const useraxiosInstance = axios.create({
    baseURL: baseURL, 
  });
  
   useraxiosInstance.interceptors.request.use(
    (config) => {
        const tokenInfo = localStorage.getItem('userInfo')
        if(tokenInfo){
          if(config.headers) config.headers.token = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
        }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useraxiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('userInfo');
        console.log("removed");
      }
      return Promise.reject(error);
    }
  );

  export default useraxiosInstance;