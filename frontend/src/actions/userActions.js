import axios from "axios";
import baseURL from "../config";
import { USER_EDITPROFILE_FAIL, USER_EDITPROFILE_REQUEST, USER_EDITPROFILE_SUCCESS, USER_GETDESTINATIONDATA_FAIL, USER_GETDESTINATIONDATA_REQUEST, USER_GETDESTINATIONDATA_SUCCESS, USER_GETFILTEREDDATA_FAIL, USER_GETFILTEREDDATA_REQUEST, USER_GETFILTEREDDATA_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";
import { Navigate } from "react-router-dom";

export const login = (email,password) => async(dispatch) =>{
    
    try {
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
        
        
        const { data } = await axios.post(`${baseURL}/login`,
         {
            email,
            password,
         },
         config
        );

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        
        localStorage.setItem('userInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
        
    }
  }


  
  export const logout = ()=> async (dispatch) =>{
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT})
  }


  
    
  


  export const register = (firstname,lastname,phonenumber,email,password) => async(dispatch)=> {
    
    try {

        dispatch({type: USER_REGISTER_REQUEST})
        const config = {
            headers: {
                "Content-type": "application/json"
            },
        }

        

          const { data } = await axios.post(`${baseURL}/signup`,
            {
                firstname,
                lastname,
                phonenumber,
                email,
                password,
            },
            config
          )

          dispatch({type: USER_REGISTER_SUCCESS, payload:data})
          dispatch({type: USER_LOGIN_SUCCESS, payload:data})
          localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
    }
}


export const editProfile = (id,firstname, lastname,phonenumber, email)=> async (dispatch) =>{
    try{
      dispatch({type: USER_EDITPROFILE_REQUEST})
      const config = {
          headers: {
              "Content-type":"application/json"
          }
      }
      const { data } = await axios.put(`${baseURL}/editprofile/${id}`,
          {
              firstname,
              lastname,
              phonenumber,
              email
          },
          config
        )
        if(data){
          dispatch({type: USER_EDITPROFILE_SUCCESS, payload: data});
        }
      

    }catch(error){
      dispatch({type: USER_EDITPROFILE_FAIL})
       console.log(error);

    }
}







export const getFilteredData = (destination,fromDate,toDate,type,numberOfPeople,priceLimit)=> async (dispatch) =>{
    try{
      dispatch({type: USER_GETFILTEREDDATA_REQUEST})
      const config = {
          headers: {
              "Content-type":"application/json"
          }
      }
      const { data } = await axios.post(`${baseURL}/getfiltereddata`,
          {
              destination,
              fromDate,
              toDate,
              type,
              numberOfPeople,
              priceLimit
          },
          config
        )
        if(data){
            console.log(data);
          dispatch({type: USER_GETFILTEREDDATA_SUCCESS, payload: data});
        }
      

    }catch(error){
      dispatch({type: USER_GETFILTEREDDATA_FAIL})
       console.log(error);

    }
}