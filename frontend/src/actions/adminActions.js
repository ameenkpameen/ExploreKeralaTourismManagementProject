import axios from "axios";
import baseURL from "../config";
import { ADMIN_ADDCABS_FAIL, ADMIN_ADDCABS_REQUEST, ADMIN_ADDCABS_SUCCESS, ADMIN_ADDHOMESTAY_FAIL, ADMIN_ADDHOMESTAY_REQUEST, ADMIN_ADDHOMESTAY_SUCCESS, ADMIN_ADDHOTEL_FAIL, ADMIN_ADDHOTEL_REQUEST, ADMIN_ADDHOTEL_SUCCESS, ADMIN_EDITPROFILE_FAIL, ADMIN_EDITPROFILE_REQUEST, ADMIN_EDITPROFILE_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, OWNER_ADDBANNER_FAIL, OWNER_ADDBANNER_REQUEST, OWNER_ADDBANNER_SUCCESS, OWNER_ADDCABS_FAIL, OWNER_ADDCABS_REQUEST, OWNER_ADDCABS_SUCCESS, OWNER_ADDHOMESTAY_FAIL, OWNER_ADDHOMESTAY_REQUEST, OWNER_ADDHOMESTAY_SUCCESS, OWNER_ADDHOTEL_FAIL, OWNER_ADDHOTEL_REQUEST, OWNER_ADDHOTEL_SUCCESS, OWNER_EDITPROFILE_FAIL, OWNER_EDITPROFILE_REQUEST, OWNER_EDITPROFILE_SUCCESS, OWNER_LOGIN_FAIL, OWNER_LOGIN_REQUEST, OWNER_LOGIN_SUCCESS, OWNER_LOGOUT, OWNER_REGISTER_FAIL, OWNER_REGISTER_REQUEST, OWNER_REGISTER_SUCCESS } from "../constants/adminConstants";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom"



export const ownerRegister = (firstname,lastname,phonenumber,email,password) => async(dispatch)=> {
    // const navigate = useNavigate()
    try {

        dispatch({type: OWNER_REGISTER_REQUEST})
        const config = {
            headers: {
                "Content-type": "application/json"
            },
        }

        

          const { data } = await axios.post(`${baseURL}/owner/signup`,
            {
                firstname,
                lastname,
                phonenumber,
                email,
                password,
            },
            config
          )

          dispatch({type: OWNER_REGISTER_SUCCESS, payload:data})
        //   dispatch({type: ADMIN_LOGIN_SUCCESS, payload:data})
          localStorage.setItem("ownerInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: OWNER_REGISTER_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
    }
}



export const ownerLogin = (email,password) => async(dispatch) =>{
    
    try {
        dispatch({type: OWNER_LOGIN_REQUEST})
        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
        
        
        const { data } = await axios.post(`${baseURL}/owner/login`,
         {
            email,
            password,
         },
         config
        );
        console.log(data);
        dispatch({type: OWNER_LOGIN_SUCCESS, payload: data})
        
        localStorage.setItem('ownerInfo',JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: OWNER_LOGIN_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message
        })
        
    }
  }



  export const adminLogout = ()=> async (dispatch) =>{
     localStorage.removeItem("ownerInfo")
     dispatch({type: OWNER_LOGOUT})
  }


  export const editOwnerProfile = (id,firstname, lastname,phonenumber, email, image_url, public_id)=> async (dispatch) =>{
      try{
        dispatch({type: OWNER_EDITPROFILE_REQUEST})
        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
        const { data } = await axios.put(`${baseURL}/owner/editownerprofile/${id}`,
            {
                firstname,
                lastname,
                phonenumber,
                email,
                image_url,
                public_id
            },
            config
          )
          if(data){
            dispatch({type: OWNER_EDITPROFILE_SUCCESS, payload: data});
          }
        

      }catch(error){
        dispatch({type: OWNER_EDITPROFILE_FAIL})
         console.log(error);

      }
  }



  export const addHomeStay = (admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,propertytype,description)=> async (dispatch) =>{
    try{
      dispatch({type: OWNER_ADDHOMESTAY_REQUEST})
      const config = {
          headers: {
              "Content-type":"application/json"
          }
      }
      const { data } = await axios.post(`${baseURL}/owner/addhomestay`,
          {
            admin_id,
            propertyname,
            destination,
            district,
            address,
            type,
            capacity,
            baseprice,
            netprice,
            newImages,
            newDocument,
            propertytype,
            description
          },
          config
        )
        if(data){
          dispatch({type: OWNER_ADDHOMESTAY_SUCCESS, payload: data})
        }
        
    }catch(error){
      dispatch({type: OWNER_ADDHOMESTAY_FAIL})
       console.log(error);

    }
}



export const addHotel = (admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,propertytype,description,numberOfRooms)=> async (dispatch) =>{
  try{
    dispatch({type: OWNER_ADDHOTEL_REQUEST})
    const config = {
        headers: {
            "Content-type":"application/json"
        }
    }
    const { data } = await axios.post(`${baseURL}/owner/addhotel`,
        {
          admin_id,
          propertyname,
          destination,
          district,
          address,
          type,
          capacity,
          baseprice,
          netprice,
          newImages,
          newDocument,
          propertytype,
          description,
          numberOfRooms
        },
        config
      )
      if(data){
        dispatch({type: OWNER_ADDHOTEL_SUCCESS, payload: data})
      }
      
  }catch(error){
    dispatch({type: OWNER_ADDHOTEL_FAIL})
     console.log(error);

  }
}




export const addCabs = (admin_id,registerNumber,brandname,modelname,destination,district,seatingCapacity,fuelType,minCharge,extraFair,newDocument,newImages)=> async (dispatch) =>{
  try{
    // console.log(document);
    dispatch({type: OWNER_ADDCABS_REQUEST})
    const config = {
        headers: {
            "Content-type":"application/json"
        }
    }
    const  {data}  = await axios.post(`${baseURL}/owner/addcabs`,
        {
          admin_id,
          registerNumber,
          brandname,
          modelname,
          destination,
          district,
          seatingCapacity,
          fuelType,
          minCharge,
          extraFair,
          newImages,
          newDocument
        },
        config
      )
      
      dispatch({type: OWNER_ADDCABS_SUCCESS,payload: data});
      
      
  }catch(error){
    dispatch({type: OWNER_ADDCABS_FAIL,
      payload:error.response && error.response.data.message
      ? error.response.data.message
      :error.message})
      console.log(error);

  }
}



export const OwnerAddBanner = (heading,description,image_url,public_id,productId,id,type) => async(dispatch)=> {
  try {
      dispatch({type: OWNER_ADDBANNER_REQUEST})
          const formData = new FormData()
          formData.append("heading" , heading)
          formData.append("description" , description)
          formData.append("image_url" , image_url)
          formData.append("public_id" , public_id)
          formData.append("productId" , productId)
          formData.append("createdby" , id)
          formData.append("type" , type)
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
              withCredentials:true,
          }
          const { data } = await axios.post(`${baseURL}/owner/addbanner`,
              formData,
              config
          )
          if(data){
              
              dispatch({type: OWNER_ADDBANNER_SUCCESS, payload:data})
          }
  } catch (error) {
      dispatch({
          type: OWNER_ADDBANNER_FAIL,
          payload:error.response && error.response.data.message
          ? error.response.data.message
          :error.message
      })
  }
}