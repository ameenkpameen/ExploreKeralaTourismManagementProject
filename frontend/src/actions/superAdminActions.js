import axios from "axios";
import baseURL from "../config";
import {  SUPERADMIN_ADDDEST_FAIL, SUPERADMIN_ADDDEST_REQUEST, SUPERADMIN_ADDDEST_SUCCESS, SUPERADMIN_LOGIN_FAIL, SUPERADMIN_LOGIN_REQUEST, SUPERADMIN_LOGIN_SUCCESS, SUPERADMIN_LOGOUT, SUPERADMIN_REGISTER_FAIL, SUPERADMIN_REGISTER_REQUEST, SUPERADMIN_REGISTER_SUCCESS } from "../constants/superAdminConstants";
import { superAdminAddBanner, superAdminAddDestination, superAdminLogin } from "../api/SuperadminAPI";

export const superadminLogin = (email,password) => async(dispatch) =>{
    
    try {
        dispatch({type: SUPERADMIN_LOGIN_REQUEST})
        const { data } = await superAdminLogin(email, password);
        dispatch({type: SUPERADMIN_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('superadminInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: SUPERADMIN_LOGIN_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
        
    }
  }


  export const superadminRegister = (firstname,lastname,phonenumber,email,password) => async(dispatch)=> {
    
    try {

        dispatch({type: SUPERADMIN_REGISTER_REQUEST})
        const config = {
            headers: {
                "Content-type": "application/json"
            },
        }

        

          const { data } = await axios.post(`${baseURL}/superadmin/signup`,
            {
                firstname,
                lastname,
                phonenumber,
                email,
                password,
            },
            config
          )

          dispatch({type: SUPERADMIN_REGISTER_SUCCESS, payload:data})
        //   dispatch({type: ADMIN_LOGIN_SUCCESS, payload:data})
          localStorage.setItem("superadminInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: SUPERADMIN_REGISTER_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
    }
}

export const superadminLogout = ()=> async (dispatch) =>{
    localStorage.removeItem("superadminInfo")
    dispatch({type: SUPERADMIN_LOGOUT})
  }


export const addDestination = (destination,district,spots,image_url,public_id) => async(dispatch)=> {
    
    try {
        
        dispatch({type: SUPERADMIN_ADDDEST_REQUEST})
            const formData = new FormData();
            formData.append("destination" , destination);
            formData.append("district" , district);
            formData.append("spots" , spots);
            formData.append("image_url" , image_url);
            formData.append("public_id" , public_id);
            

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials:true,
            }
            const { data } = await superAdminAddDestination(formData,config)
            if(data){
                dispatch({type: SUPERADMIN_ADDDEST_SUCCESS, payload:data})
            }
    } catch (error) {
        dispatch({
            type: SUPERADMIN_ADDDEST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
    }
}


export const addBanner = (heading,description,image_url,public_id) => async(dispatch)=> {
    try {
        dispatch({type: SUPERADMIN_ADDDEST_REQUEST})
            const formData = new FormData()
            formData.append("heading" , heading)
            formData.append("description" , description)
            formData.append("image_url" , image_url)
            formData.append("public_id" , public_id)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials:true,
            }
            const { data } = await superAdminAddBanner(formData,config)
            if(data){
                
                dispatch({type: SUPERADMIN_ADDDEST_SUCCESS, payload:data})
            }
    } catch (error) {
        dispatch({
            type: SUPERADMIN_ADDDEST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
    }
}



