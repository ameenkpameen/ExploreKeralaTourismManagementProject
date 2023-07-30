import axios from 'axios'
const baseURL = "http://localhost:5000"
const cloudinaryUpload = "https://api.cloudinary.com/v1_1/dp7ydtvg8/image/upload"
const axiosInstance = axios.create({ baseURL });

const configure = axiosInstance.interceptors.request.use((req)=>{
                    if(localStorage.getItem('userInfo')){
                        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;    }
                  return req;
                })


        
export default baseURL;