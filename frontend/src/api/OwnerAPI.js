import axios from "axios";
import baseURL from "../config";
import cloudinaryUpload from '../utils/cloudinaryAPI'
import owneraxiosInstance from '../utils/ownerAxiosApi'


export const ownerRegisters = (firstname,lastname,phonenumber,email,password,config)=>axios.post(`${baseURL}/owner/signup`,{firstname,lastname,phonenumber,email,password,},config)
export const ownerLogins = (email,password,config)=>axios.post(`${baseURL}/owner/login`,{email,password,},config);
export const getOwnerProfile = (id)=> owneraxiosInstance.get(`/owner/getprofile/${id}`)
export const editOwnerProfileData = (id,firstname, lastname,phonenumber, email, image_url, public_id,config)=>owneraxiosInstance.put(`/owner/editownerprofile/${id}`,{firstname,lastname,phonenumber,email,image_url,public_id},config)
export const getOwnerProperties = (id)=> owneraxiosInstance.get(`/owner/getmyproperties/${id}`)
export const ownerAddBanner = (formData,config)=>owneraxiosInstance.post(`/owner/addbanner`,formData,config)
export const ownerGetDestinations = owneraxiosInstance.get(`/owner/getdestinations`)
export const ownerAddHomeStay = (admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,propertytype,description,config) => owneraxiosInstance.post(`/owner/addhomestay`,{admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,propertytype,description},config)
export const ownerAddHotel = (admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,propertytype,description,numberOfRooms,config) => owneraxiosInstance.post(`/owner/addhotel`,{admin_id,propertyname, destination, district,address, type, capacity, baseprice,netprice,newImages, newDocument,propertytype,description,numberOfRooms},config)
export const ownerAddCab = (admin_id,registerNumber,brandname,modelname,destination,district,seatingCapacity,fuelType,minCharge,extraFair,newDocument,newImages,config) => owneraxiosInstance.post(`/owner/addcabs`,{admin_id,registerNumber,brandname,modelname,destination,district,seatingCapacity,fuelType,minCharge,extraFair,newDocument,newImages},config)
export const ownerEditHotel = (hotelData)=> owneraxiosInstance.post(`/owner/edithoteldata`,{hotelData})
export const ownerEditHomestay = (homestayData)=> owneraxiosInstance.post(`/owner/edithomestaydata`,{homestayData})
export const ownerEditCab = (cabData)=> owneraxiosInstance.post(`/owner/editcabdata`,{cabData})
export const deleteCabImage = (public_id,id)=> owneraxiosInstance.post(`/owner/deletecabimage`,{public_id,id})
export const deleteHomestayImage = (public_id,id)=> owneraxiosInstance.post(`/owner/deletehomestayimage`,{public_id,id})
export const deleteHotelImage = (public_id,id)=> owneraxiosInstance.post(`/owner/deletehotelimage`,{public_id,id})
export const getCabDetails = (id)=> owneraxiosInstance.get(`/owner/getcabdetails/${id}`)
export const getHomeStayDetails = (id)=> owneraxiosInstance.get(`/owner/gethomestaydetails/${id}`)
export const getHotelDetails = (id)=> owneraxiosInstance.get(`/owner/gethoteldetails/${id}`)
export const deleteCab = (id)=> owneraxiosInstance.delete(`/owner/deletecabproperty/${id}`)
export const deleteHomeStay = (id)=> owneraxiosInstance.delete(`/owner/deletehomstayproperty/${id}`)
export const deleteHotel = (id)=> owneraxiosInstance.delete(`/owner/deletehotelproperty/${id}`)
export const getPropertyOrders =  (id,dataPerPage,pageNumber)=> owneraxiosInstance.get(`/owner/getorders/${id}/${pageNumber}/${dataPerPage}`)
export const updateOrderStatus = (id)=> owneraxiosInstance.post(`/owner/approveorderstatus/${id}`)
export const getTypeDataFromBackend = (id)=> owneraxiosInstance.get(`/owner/gettypedata/${id}`)
export const getTypeNumberFromBackend = (id)=> owneraxiosInstance.get(`/owner/gettypenumber/${id}`)
export const getChartDataFromBackend = (id)=> owneraxiosInstance.get(`/owner/getchartdata/${id}`)
export const getOrderStatusDashboard = (id)=> owneraxiosInstance.get(`/owner/getorderstatuses/${id}`)
export const getWeekWiseOrders = (id)=> owneraxiosInstance.get(`/owner/getweekorders/${id}`)
export const getPendingOrderCount = (id) => owneraxiosInstance.get(`/owner/getpendingordercount/${id}`)

export const uploadCloudinary = (formData)=> axios.post(`${cloudinaryUpload}`,formData);

export const getUserData = (id)=> owneraxiosInstance.get(`/owner/getuserdata/${id}`)
export const getOwnerChats = (id)=> owneraxiosInstance.get(`/chat/getchat/${id}`)

export const getUserChats = (id)=> owneraxiosInstance.get(`/chat/getchat/${id}`)
export const getMessages = (id)=> owneraxiosInstance.get(`/message/${id}`)
export const addMessage = (data)=> owneraxiosInstance.post(`/message/add`, data)